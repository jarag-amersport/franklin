/* eslint consistent-return: 0 */
const path = require('path');

/**
 * Ignore dynamic `import()` declarations, passing them through to the bundle as
 * raw imports. It's as though you had added the `webpackIgnore` magic comment
 * to each one.
 *
 * The `filter` property determines which imports to ignore. If `filter` is a
 * string, then all dynamic imports which contain that string are ignored.
 *
 * @example filter-foo
 * ```js
 * // when this is the plugin configuration:
 * config.plugins.push(new ExternalDynamicImportPlugin({ filter: 'foo' }));
 *
 * // then these imports will not be resolved by webpack, and will stay
 * // `import()` calls in the bundle, calling the browser `import()` method
 * import('../foo-module.js')
 * import('/path/to/foo/main.js')
 *
 * // but this import will still be resolved and its code put in the bundle:
 * import('../bar-module/index.js')
 * ```
 *
 * When a static import declaration is found which would satisfy the `filter`
 * function, it cannot pass through like dynamic imports can. ES syntax requires
 * `import` declarations to be at top level only, but all Webpack-compiled
 * bundles run their code inside function blocks; leaving an `import ... from`
 * in those function bodies is a syntax error.
 *
 * You may want to ignore static imports whose imported paths pass your filter
 * function, but you may also want to throw an error reminding the user to use
 * dynamic imports only to fetch a given module. The `staticImports` property
 * configures this behavior.
 *
 * - `errors`: cause compilation to fail if a static import of one of the
 *   filtered paths is found
 * - `warnings`: skip static imports and log a warning whenever one is found
 * - any other value: skip static imports
 */
class ExternalDynamicImportPlugin {
  /**
   * @param {Object} config
   * @param {(RegExp|string|dynamicImportFilter)} config.filter
   * @param {('warnings'|'errors')} config.staticImports
   */
  constructor(config = {}) {
    this.me = this.constructor.name;
    const { filter, staticImports } = config;
    this.handleStatic = staticImports;
    if (!filter) {
      throw new Error(
        `${this.me}: Must provide a config object with a "filter" property.`,
      );
    }
    if (filter instanceof RegExp) {
      this.callback = (request) => filter.test(request);
    } else if (typeof filter === 'string') {
      this.callback = (request) => request.includes(filter);
    } else if (typeof filter === 'function') {
      this.callback = filter;
    } else {
      throw new Error(
        `${
          this.me
        }: "filter" property must be a string, function, or regular expression.`,
      );
    }
  }

  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(this.me, (compilation) => {
      this.logger = compilation.getLogger(this.me) || console;
      // compilation.hooks.normalModuleLoader.tap(this.me, (loaderContext, module) => {
      //   debugger;
      // })
    });
    compiler.hooks.normalModuleFactory.tap(this.me, (factory) => {
      factory.hooks.parser.for('javascript/auto').tap(this.me, (parser) => {
        const toAbsoluteImportStr = (importStr) => path.resolve(
          path.dirname(parser.state.module.resource),
          importStr,
        );
        const applyFilter = (importStr) => {
          const mod = parser.state.module;
          if (mod.resource.includes('node_modules/')) {
            // not local project code, don't mess with dependencies
            return;
          }
          if (importStr.includes('node_modules')) {
            // likely webpack loader or injector code
            // TODO: investigate all cases of this
            return;
          }
          const result = this.callback(toAbsoluteImportStr(importStr), mod);
          if (result === true) {
            return false;
          }
        };
        /** @type {import('tapable').SyncBailHook} */
        const { importCall } = parser.hooks;
        importCall.tap(this.me, (expr) => {
          const importNode = expr.arguments.find(
            (arg) => arg.type === 'Literal',
          );
          if (importNode && importNode.value) {
            return applyFilter(importNode.value);
          }
        });
        if (
          this.handleStatic === 'warnings'
          || this.handleStatic === 'errors'
        ) {
          parser.hooks.import.tap(this.me, (_, source) => {
            // webpack processes some non-js files through the javascript/auto
            // parser. annoying!
            if (
              parser.state.module.loaders.some(
                (loader) => loader.loader && loader.loader.includes('css-loader'),
              )
            ) {
              return;
            }
            if (applyFilter(source) === false) {
              const mod = parser.state.module;
              // check
              mod[this.handleStatic].push(
                new Error(`${this.me}: "/${path.relative(
                  compiler.context,
                  mod.resource,
                )}" statically imports "/${path.relative(
                  compiler.context,
                  toAbsoluteImportStr(source),
                )}",
which the configured filter function excludes. However, it cannot be excluded from the bundle unless it is converted to a dynamic import.`),
              );
            }
          });
        }
      });
    });
  }
}

/**
 * @callback dynamicImportFilter
 * @param {string} request - Path to module to be imported
 * @param {import('webpack').Module} requestor - Module which contains the import call
 * @returns {boolean} - Whether to ignore the call
 */

// future esmodule compat
ExternalDynamicImportPlugin[
  ExternalDynamicImportPlugin.name
] = ExternalDynamicImportPlugin;

module.exports = ExternalDynamicImportPlugin;
