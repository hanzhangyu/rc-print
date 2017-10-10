var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var definePlugin = webpack.DefinePlugin;

module.exports = {
  entry: './demo/index.jsx',
  output: {
    path: './demo/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders:[{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
            'style',
            'css'
            , { publicPath: '../' })
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=512'
    }]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new uglifyJsPlugin({compress: {warnings: false}}),
    new definePlugin({'process.env': {NODE_ENV: '"production"'}})
  ]
};
