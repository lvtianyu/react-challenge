const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

debug('Creating configuration.')

/**
 * 声明配置文件
 */
const webpackConfig = {
    name: 'client',
    target: 'web',
    devtool: config.compiler_devtool,
    resolve: {
      root: paths.client(),
      extensions: ['', '.js', '.jsx', '.json'],


    },
    cache:false,
    module: {
 
    }
  }
  
/**
 * 入口文件
 */
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
  app: __DEV__ ?
    [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`) :
    [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// 生产文件输出
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path
}




// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}



/**
 * Loaders
 */

//处理ES6，jsx等
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}]

//处理CSS
const BASE_STYLE_LOADER = 'css?sourceMap&-minimize';
const BASE_CSS_LOADER = 'css?sourceMap&-minimize&modules';

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: /(node_modules)/,
  loaders: [
    'style',
    BASE_STYLE_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})
//处理局部CSS
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude:  /(node_modules)/,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})
//全局CSS不做处理 这个和上面那个功能略有重合 此处我们没用到bower包管理器并不会生成bower_components包
// "include" is commonly used to match the directories；
// include: An array of paths or files where the imported files will be transformed by the loader

webpackConfig.module.loaders.push({
  test: /\.css$/,
  include:  /(node_modules|bower_components|styles)/,
  loaders: [
    'style',
    BASE_STYLE_LOADER,
    'postcss'
  ]
})

webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push({
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  }, {
    test: /\.otf(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  }, {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  }, {
    test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]'
  }, {
    test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  }, {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=1'
  })
  /* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

module.exports = webpackConfig