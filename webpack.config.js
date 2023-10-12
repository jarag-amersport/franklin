/* eslint-disable camelcase */
const { configureWebpack, graphQL } = require('@magento/pwa-buildpack');
const http = require('http');
const webpack = require('webpack');
const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const FranklinPWAInjectorPlugin = require('./tools/FranklinPWAInjectorPlugin');
const ExternalDynamicImportPlugin = require('./tools/ExternalDynamicImportPlugin');
const { DefinePlugin } = webpack;

const { getMediaURL, getAvailableStoresConfigData } = graphQL;

module.exports = async env => {
  /** @type {import('webpack').Configuration} */
  const config = await configureWebpack({
    context: __dirname,
    env
  });
  const pwaDir = path.join(config.context, 'src');
  const pagesDir = 'src/pages';
  const outputDir = 'scripts/pwa-dist';

  // Fix publicPath
  config.output.publicPath = `/${outputDir}/`;
  config.output.path = path.resolve(__dirname, outputDir);

  config.entry = async () => {
    const entrypoints = {};
    const pages = await readdir(pagesDir);
    for (const page of pages) {
      const name = path.basename(page, '.js');
      entrypoints[name] = path.relative(
        config.context,
        path.resolve(pagesDir, page)
      );
    }
    return entrypoints;
  };

  const mediaUrl = await getMediaURL();
  const storeConfigData = {
    store_code: 'maidenform_store_view',
    code: 'maidenform_store_view',
    locale: 'en_US',
    secure_base_media_url: 'https://franklin.maidenform.com/',
    store_name: 'Maidenform Store View'
  };
  const { availableStores } = await getAvailableStoresConfigData();

  /**
   * Loop the available stores when there is provided STORE_VIEW_CODE
   * in the .env file, because should set the store name from the
   * given store code instead of the default one.
   */
  const availableStore = availableStores.find(
    ({ store_code }) => store_code === process.env.STORE_VIEW_CODE
  );

  global.MAGENTO_MEDIA_BACKEND_URL = mediaUrl;
  global.LOCALE = storeConfigData.locale.replace('_', '-');
  global.AVAILABLE_STORE_VIEWS = availableStores;

  const possibleTypes = JSON.parse(
    fs.readFileSync('possibleTypes.json', 'utf8')
  );

  config.module.noParse = [
    /@adobe\/adobe-client-data-layer/,
    /braintree-web-drop-in/
  ];

  // Remove unnecessary plugins
  const pluginsToRemove = new Set([
    'HTMLWebpackPlugin',
    'ServiceWorkerPlugin',
    'RootComponentsPlugin',
    'UpwardIncludePlugin',
    'WebpackAssetsManifest'
  ]);
  const plugins = config.plugins.filter(
    plugin => !pluginsToRemove.has(plugin.constructor.name)
  );

  const isFranklinModule = (filePath) =>
    !filePath.startsWith(pwaDir) && !filePath.endsWith('.json');

  config.plugins = [
    new ExternalDynamicImportPlugin({
      filter: isFranklinModule,
      staticImports: 'errors',
    }),
    ...plugins,
    new DefinePlugin({
      POSSIBLE_TYPES: JSON.stringify(possibleTypes),
      STORE_NAME: availableStore
        ? JSON.stringify(availableStore.store_name)
        : JSON.stringify(storeConfigData.store_name),
      STORE_VIEW_CODE: process.env.STORE_VIEW_CODE
        ? JSON.stringify(process.env.STORE_VIEW_CODE)
        : JSON.stringify(storeConfigData.code),
      AVAILABLE_STORE_VIEWS: JSON.stringify(availableStores),
      DEFAULT_LOCALE: JSON.stringify(global.LOCALE),
      DEFAULT_COUNTRY_CODE: JSON.stringify(
        process.env.DEFAULT_COUNTRY_CODE || 'US'
      ),
      __DEV__: process.env.NODE_ENV !== 'production'
    }),
    new FranklinPWAInjectorPlugin()
  ];

  const analysisName = process.env.ANALYZE_BUNDLE;
  if (analysisName) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        statsFilename: path.join(
          __dirname,
          `bundle-${analysisName}-stats.json`
        ),
        reportFilename: path.join(
          __dirname,
          `bundle-${analysisName}-report.html`
        ),
        reportTitle: analysisName,
        defaultSizes: 'gzip'
      })
    );
  }

  const opt = config.optimization;
  opt.runtimeChunk = 'single';
  opt.namedChunks = false;
  opt.namedModules = false;
  opt.flagIncludedChunks = true;
  opt.occurrenceOrder = true;
  opt.splitChunks = {
    hidePathInfo: true,
    chunks: 'all',
    name: false,
    cacheGroups: {
      commons: {
        chunks: 'all',
        minChunks: 2,
        reuseExistingChunk: true
      }
    }
  };
  // prevent removal of console statements
  if (env.mode === 'production') {
    opt.minimizer[0].options.terserOptions.compress.drop_console = false;
    config.output.hashDigestLength = 8;
  } else {
    config.devtool = 'inline-source-map';
  }
  if (config.watch) {
    if (process.env.FOCUS_WEBPACK_BUILD) {
      const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
      config.plugins.push(new CleanTerminalPlugin());
    }
  }
  if (config.devServer) {
    /** @type {import('webpack-dev-server').Configuration} */
    const devServerOverrides = {
      before: undefined,
      // this is necessary in dev mode to allow scripts running from the dev
      // server origin to access scripts running on the local origin (i.e.
      // franklin scripts)
      after: (app) => {
        app.use((req, res, next) => {
          if (!req.url.startsWith(config.output.publicPath)) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.type(path.extname(req.url));
            http
              .get(`http://localhost:3000/${req.url}`, (upstream) => {
                upstream.pipe(res);
              })
              .on('error', next)
              .on('timeout', next);
          } else {
            next();
          }
        });
      },
      clientLogLevel: 'error',
    };
    Object.assign(config.devServer, devServerOverrides);
  }

  return config;
};
