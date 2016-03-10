import webpack from 'webpack';
import path from 'path';

const sourceReg = /src\//i;
function matchSources(sourcePath) {
  return sourceReg.test(path.relative(__dirname, sourcePath));
}

const babelLoader = {
  test: /\.js$/,
  loader: 'babel',
  include: matchSources,
  query: {
    presets: ['es2015', 'stage-0', 'react'],
  },
};

export default {
  entry: [
    './src/index.js',
    'webpack-hot-middleware/client',
  ],


  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  postcss: [
    require('postcss-import'),
    require('autoprefixer'),
  ],

  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=[name].[hash].[ext]',
        exclude: /node_modules/,
      },
      babelLoader,
      { test: /\.css$/, loaders: ['style', 'css?module&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'] },
    ],
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/assets/',
  },

  devtool: 'cheap-module-source-map',
  debug: true,
};
