import {Configuration, DefinePlugin} from 'webpack'
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import * as path from 'path'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin')

export function makeConfig({
  mode,
}: {
  mode: 'development' | 'production'
}): Configuration {
  console.log({mode})

  const devServer: DevServerConfiguration = {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  }

  const config: Configuration = {
    mode,
    devServer: mode === 'development' ? devServer : undefined,
    entry: './src/index.ts',
    output: {
      filename: 'output/index.js',
      assetModuleFilename: 'output/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool:
      mode === 'development' ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: {
            // `.swcrc` can be used to configure swc
            loader: 'swc-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'output/[name].css',
        chunkFilename: 'output/[id].css',
      }),
      new DefinePlugin({
        __DEV__: mode === 'development',
        __FIEND_DEV__: false,
      }),
    ],
    optimization: {
      minimizer: ['...', new OptimizeCSSAssetsPlugin({})],
    },
  }

  switch (mode) {
    case 'development':
      config.plugins?.push(new ForkTsCheckerWebpackPlugin())
      break
    case 'production':
      // Uncomment to investigate bundle size.

      // config.plugins?.push(
      //   new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
      // )
      break
  }

  return config
}
