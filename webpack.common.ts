import {Configuration, DefinePlugin} from 'webpack'
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'

export function makeConfig({
  mode,
}: {
  mode: 'development' | 'production'
}): Configuration {
  const devServer: DevServerConfiguration = {}

  console.log({mode})

  const config: Configuration = {
    mode,
    devServer: mode === 'development' ? devServer : undefined,
    entry: './src/index.ts',
    output: {
      filename: './index.js',
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.js'],
    },
    devtool:
      mode === 'development' ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: mode === 'development' ? 'commonjs' : 'esNext',
            },
          },
        },
        // {
        //   test: /\.js$/,
        //   enforce: 'pre',
        //   use: ['source-map-loader'],
        // },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        __DEV__: mode === 'development',
        __FIEND_DEV__: false,
      }),
    ],
  }

  if (mode === 'production') {
    config.plugins
      ?.push
      // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
      ()
  }

  return config
}
