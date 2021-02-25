const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

function plugins(argv) {
  if (argv.mode === 'production') {
    return [new OptimizeCSSAssetsPlugin({})];
  }
  return [];
}

module.exports = (env, argv) => ({
  entry: { bundle: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              minimize: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: false
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'second.html',
      template: './src/second.html'
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'third.html',
      template: './src/third.html'
    }),
   
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    
    ...plugins(argv)
  ],
});
