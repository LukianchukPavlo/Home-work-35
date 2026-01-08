const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const $ = require('jquery');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const { MODE } = process.env;
  const isDev = MODE === 'development';

  return {
    mode: argv.mode || 'development',

    context: path.resolve(__dirname, 'src'),

    resolve: {
      
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },

    entry: {
      main: './index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash].js',
      chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash].chunk.js',
      publicPath: '/',
    },  

    devServer: {
      port: 3000,
      hot: isDev, 
      historyApiFallback: true,
      open: true, 
    },

    optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        styles: {
            name: 'styles',  // The name of the extracted styles file
            type: 'css/mini-extract',  // The type for extracting CSS
            chunks: 'all',  // All chunks (including dynamic ones) will go into this file
            enforce: true,  // Forces styles extraction
          },
        commons: {
            name: 'commons',
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
            minSize: 0,
          },
      }
    },
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, 
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: 'asset/resource',
      },
        {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource'
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.csv$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.(ts|js)x?$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
        }
      },
      {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    ...(isDev ? [] : [new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      })]),
  ],
  devtool: isDev ? 'eval-source-map' : 'source-map',
};
};




