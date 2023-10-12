const { CompatSource } = require('webpack-sources');
const { minify } = require('terser');
const { resolve } = require('path');
const { readFileSync, writeFileSync, unlinkSync } = require('fs');

/**
 * @typedef {import('webpack').Compiler} Compiler
 * @typedef {import('webpack/lib/Compilation')} Compilation
 */

/**
 * Represents the source code of the injector script, which includes the most
 * up-to-date chunk graph.
 *
 * Lazy-evaluates the current chunk graph every time it's read, so that late
 * additions to the assets by other plugins can be caught in time.
 */
class InjectorSource {
  constructor(scriptBase, getManifest, minifyOptions, injectorFilename, mode) {
    this.scriptBase = scriptBase;
    this.getManifest = getManifest;
    this.minifyOptions = minifyOptions;
    this.injectorFilename = injectorFilename;
    this.mode = mode;
  }

  source() {
    return this.sourceAndMap().source;
  }

  sourceAndMap() {
    let source =
      this.mode === 'production'
        ? ''
        : '/** FRANKLIN NON-PRODUCTION GENERATED CODE, DO NOT MODIFY **/\n';
    source += `const manifest = ${JSON.stringify(
      this.getManifest(),
      null,
      2
    )};export const loadPWA = async (bundleName) => Promise.all(
  manifest.entrypoints[bundleName].map(id => new Promise((resolve, reject) => {
    const bundle = manifest.bundles[id];
    if (!bundle) {
      return resolve();
    }
    const loadTimeout = setTimeout(() =>
      reject(new Error(\`Load of \${bundle} timed out!\`)),
      10000
    );
    const script = document.createElement("script");
    script.setAttribute("crossorigin", "anonymous");
    script.src = '${this.scriptBase}' + bundle;
    script.onload = () => {
      clearTimeout(loadTimeout);
      resolve();
    };
    script.onerror = (e) => {
      clearTimeout(loadTimeout);
      reject(new Error(\`Load of \${bundle} failed! \${e.message}\`));
    };
    document.head.append(script);
  })));
export default { loadPWA };
`;
    if (this.minifyOptions) {
      const outputOpts = this.minifyOptions.output || {};
      const { code, map } = minify(source, {
        ...this.minifyOptions,
        ecma: 2020,
        module: true,
        output: {
          ...outputOpts,
          comments: true
        }
      });
      return { source: code, map };
    }
    return { source, map: null };
  }
}

/**
 * Creates a helper script which Franklin blocks can use to import PWA bundles.
 *
 * @description
 * Franklin blocks which integrate PWA Studio/Venia components need to import
 * those components directly via loadScript calls or ES Module imports. However,
 * PWA components need to go through the PWA Studio build process, whereby
 * Webpack produces bundle files. Franklin blocks must import these bundles.
 *
 * This plugin starts by autoconfiguring the "entrypoints" which will build into
 * bundles that blocks can load. There should be a folder in the PWA source
 * directory which contains files for each of these blocks, with descriptive
 * names.
 *
 * ```
 * cart/
 *   index.js
 * checkout/
 *   index.js
 * signin.js
 * ```
 *
 * then this plugin will create bundles called `cart`, `checkout`, and `signin`.
 *
 * An entrypoint file should act like the main entry point file of any
 * PWA app; it should import top-level components and create a React tree in a
 * DOM node. it doesn't export anything, but running it should cause the app to
 * render.
 *
 * This plugin adds a plain ES Module helper script into the final build, which
 * can be imported into any Franklin block and can load a PWA bundle _by name_.
 *
 * The `loadPWA` function takes the name of an entrypoint and returns a Promise
 * which resolves when all of the bundle scripts for that entrypoint are loaded.
 *
 * Note that Webpack configuration should include entry points for each block
 * that requires a PWA implementation.
 *
 * @example blocks/pwa-checkout-block/pwa-checkout-block.js
 * ```js
 * import { loadPWA } from "/scripts/pwa-dist/pwa-injector.js"
 * function decorate(block) {
 *   // [...]
 *   await loadPWA('checkout');
 * }
 * ```
 */
class FranklinPWAInjectorPlugin {
  /**
   * @param {Object} options
   * @param {string} options.injectorFilename - Name of the script to emit. Can
   * also have directory segments to specify a path, e.g. `util/helper.js`
   * Default `pwa-injector.js`
   */
  constructor(options = {}) {
    this.config = this._resolveOptions(options);
  }

  /** @param {Compiler} compiler */
  apply(compiler) {
    this.compiler = compiler;
    this.name = FranklinPWAInjectorPlugin.name;
    this.logger = compiler.getInfrastructureLogger(this.name);
    this.compiler.hooks.emit.tap(this.name, compilation =>
      this._emitInjector(compilation)
    );
    this._configDevServer();
  }

  /**
   * Saves space by setting the bundle filenames themselves as members in an
   * array, and then declaring each entrypoint's required bundles as a list of
   * indices in that array.
   * @param {Compilation} compilation
   */
  _buildManifest(compilation) {
    const manifest = {
      bundles: [],
      entrypoints: {}
    };
    for (const chunk of compilation.chunks) {
      manifest.bundles[chunk.id] = chunk.files[0];
    }
    this.logger.debug(
      'Gathered filenames for %s chunks',
      compilation.chunks.length
    );
    for (const [name, entrypoint] of compilation.entrypoints) {
      manifest.entrypoints[name] = entrypoint.chunks.map(chunk => chunk.id);
      this.logger.debug(
        'Recorded %s chunks for "%s"',
        entrypoint.chunks.length,
        name
      );
    }
    return manifest;
  }

  /**
   * In watch mode, the developer will be using the Franklin server in their
   * browser, not the Webpack dev server. The Franklin dev server can't proxy
   * to some local server, so instead, we serve PWA scripts from the
   * address of the dev server itself (a different origin).
   */
  _configDevServer() {
    /** @type {import('webpack-dev-server').Configuration} */
    const { devServer } = this.compiler.options;
    if (!devServer) {
      return;
    }
    const { injectorFilename } = this.config;
    if (devServer.host) {
      const urlBase = new URL('http://localhost');
      urlBase.protocol = devServer.https ? 'https' : 'http';
      urlBase.hostname = devServer.host || 'localhost';
      urlBase.port = devServer.port;
      urlBase.pathname = this.compiler.options.output.publicPath;
      this.compiler.options.output.publicPath = urlBase.href;
      devServer.headers = devServer.headers || {};
      Object.assign(devServer.headers, {
        'Access-Control-Allow-Origin': '*'
      });
    }
    /**
     * if writeToDisk is false (or filtered), make an exception for the
     * injector script, so Franklin code doesn't have to know the dev-mode
     * script origin to import it.
     * Avoid making noise in the Git index by replacing it only temporarily, then
     * swapping it back out when the compiler is done.
     */
    if (devServer.writeToDisk === true) {
      return;
    }
    this.logger.debug(
      'Writing %s to disk during watch mode for Franklin to pick up new bundle URLs',
      injectorFilename
    );
    const injectorPath = resolve(
      this.compiler.options.output.path,
      injectorFilename
    );
    const prevFilter = devServer.writeToDisk || (() => false);
    devServer.writeToDisk = filename =>
      filename === injectorPath || prevFilter(filename);
    // did we not originally expect to emit the injector?
    if (!prevFilter(injectorPath)) {
      // and is there already one in the dist path?
      try {
        const originalInjectorContents = readFileSync(injectorPath);
        // then cache its original contents and restore them when done.
        this.compiler.hooks.watchClose.tap(this.name, () => {
          try {
            writeFileSync(injectorPath, originalInjectorContents);
            this.logger.debug('Restored original %s', injectorFilename);
          } catch (e) {
            this.logger.warn(
              'Could not restore original %s due to error: %s',
              injectorFilename,
              e.message
            );
          }
        });
      } catch (e) {
        if (e.code === 'ENOENT') {
          // if it wasn't there first, then remove it when we're done
          this.compiler.hooks.watchClose.tap(this.name, () => {
            try {
              unlinkSync(injectorPath);
              this.logger.debug('Removed temporary %s', injectorFilename);
            } catch (e) {
              // ignore
            }
          });
        } else {
          this.logger.debug(
            'Error trying to read original %s: %s',
            injectorFilename,
            e.message
          );
        }
      }
    }
  }

  /** @param {Compilation} compilation */
  _emitInjector(compilation) {
    const { compiler } = this;
    this.logger.debug(
      'Creating %s and adding to bundle',
      this.config.injectorFilename
    );

    const { minimize, minimizer } = compiler.options.optimization;
    const terserOptions =
      minimize && // minification is ON
      Array.isArray(minimizer) && // a minimizer list EXISTS
      minimizer
        .map(({ options }) => options && options.terserOptions)
        // if it has this, then it's the terser plugin
        .find(Boolean); // so get the first one that exists

    /**
     * Add the injector script at this stage, when the rest of the chunks are
     * built and the `buildManifest` method can analyze them.
     */
    compilation.emitAsset(
      this.config.injectorFilename,
      new CompatSource(
        new InjectorSource(
          this._getScriptBase(),
          () => this._buildManifest(compilation),
          terserOptions,
          this.config.injectorFilename,
          this.compiler.options.mode
        )
      )
    );
  }

  _getScriptBase() {
    return this.compiler.options.output.publicPath;
  }

  _resolveOptions(opts = {}) {
    return {
      injectorFilename: 'pwa-injector.js',
      ...opts
    };
  }
}

// future esmodule compat
FranklinPWAInjectorPlugin[
  FranklinPWAInjectorPlugin.name
] = FranklinPWAInjectorPlugin;

module.exports = FranklinPWAInjectorPlugin;
