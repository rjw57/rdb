var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = false;

var plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.DedupePlugin(),
  new HtmlWebpackPlugin({ title: 'Rich\'s DB' }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'sql.js', filename: 'sql.js',
  }),
];

if(isProduction) {
  plugins = plugins.concat([
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({
      exclude: /sql\.js$/,
      compress: { unused: true, dead_code: true, warnings: false },
    }),
  ]);
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './entry.jsx',
    'sql.js': ['sql.js'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    noParse: [ /sql\.js\/.*\.js$/ ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: { presets: ['react', 'es2015'], },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      // For Bootstrap
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devtool: 'source-map',
  plugins: plugins,
}
