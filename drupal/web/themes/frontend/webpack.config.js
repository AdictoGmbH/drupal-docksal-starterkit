const path = require('path');
const isDev = (process.env.NODE_ENV !== 'production');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const jsonImporter = require('node-sass-json-importer');
const autoprefixer = require('autoprefixer');
const Fiber = require('fibers');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: './js/main.js',
    style: './styles/main.scss',
    drupal: './styles/drupal.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
    chunkFilename: 'js/async/[name].chunk.js',
    filename: 'js/[name].js',
    publicPath: '/themes/frontend/dist/'
  },
  module: {
    rules: [{
      test: /\.(config.js)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: './'
          }
        }
      ]
    },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|xml|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?[hash]',
          },
        },
          {
            loader: 'img-loader',
            options: {
              enabled: !isDev,
            },
          },
        ],
      },
      {
        test: /modernizrrc\.js$/,
        use: ['expose-loader?Modernizr', 'webpack-modernizr-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                fiber: Fiber,
                importer: [globImporter(), jsonImporter()]
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new SVGSpritemapPlugin(path.resolve(__dirname, 'images/icons/**/*.svg'), {
      output: {
        filename: 'sprites/sprite.svg',
        svgo: false,
        svg: {
          sizes: false
        }
      },
      sprite: {
        prefix: false,
        gutter: 0,
        idify: false,
        generate: {
          title: false,
          symbol: true,
          use: true,
          view: '-view'
        }
      },
      styles: {
        filename: path.resolve(__dirname, 'styles/helpers/_svg-sprite.scss'),
        format: 'fragment'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
