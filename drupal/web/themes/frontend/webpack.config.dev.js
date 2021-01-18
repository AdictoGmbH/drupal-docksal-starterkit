const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FilewatcherPlugin = require('filewatcher-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BrowserSync = require("browser-sync");
const throttle = require('lodash.throttle');
const { exec } = require('child_process');

let filewatcherReady = false;

function getBrowserSyncInstance() {
  return BrowserSync.get('bs-webpack-plugin');
}

function executeCommand(cmd, type) {
  return throttle((file, event) => {
    // console.log(type, file);

    // Skip initial run
    if (!filewatcherReady) {
      return;
    }

    console.log(`Executing '${cmd}' due to '${type}' event on '${file}'...`);

    exec(cmd, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(`Executed '${cmd}', reloading page`);

      const browserSync = getBrowserSyncInstance();

      browserSync.reload();
    });
  }, 50, { leading: false })
}

const icons = require('./images/icons/_mapping.json');
const colorGroups = require('./styles/settings/_colors.json').colors;

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'images/icons/*.svg' },
    ]),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [/node_modules/, /images/, /spritemap/, /svg-sprites/]
    }),
    new HtmlWebpackPlugin({
      template: 'preview/index.twig',
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          icons,
          // We cannot pass a nested object. For some reason the loop fails. Let's create a nested array instead.
          colors: Object.entries(colorGroups).reduce((groups, [groupKey, groupEntries]) => {
            groups.push({
              key: groupKey,
              entries: Object.entries(groupEntries).reduce((colors, [name, value]) => {
                colors.push({
                  name,
                  value
                });

                return colors;
              }, [])
            });

            return groups;
          }, [])
        };
      }
    }),
    new FilewatcherPlugin({
      watchFileRegex: ['./{layouts,templates,src}/**/*.twig'],
      onAddCallback: executeCommand('fin drush cr', 'add'),
      onUnlinkCallback: executeCommand('fin drush cr', 'unlink'),
      onChangeCallback: executeCommand('fin drush cc render', 'change'),
      onReadyCallback: () => {
        filewatcherReady = true;
      },
    }),
    new BrowserSyncPlugin({
      proxy: {
        target: 'https://psydrupal.docksal/',
        proxyReq: [
          function(proxyReq) {
            proxyReq.setHeader('Cache-Control', 'no-cache, no-store');
          }
        ]
      },
      browser: 'chrome',
      open: false,
      https: false,
      notify: true,
      logConnections: true,
      reloadOnRestart: true,
      injectChanges: true,
      online: true,
      // reloadDelay: 500,
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
      },
      files: [
        {
          match: ['**/*.css', '**/*.js'],
          fn: (event, file) => {
            if (event == 'change') {
              const browserSync = getBrowserSyncInstance();

              if (file.match(/.js$/)) {
                browserSync.reload();
              } else {
                browserSync.stream();
              }
            }
          }
        }
      ]
    }, {
      // prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this
      reload: false,
      injectCss: true,
      name: 'bs-webpack-plugin'
    }),
  ]
});
