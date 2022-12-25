import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import {Configuration, DefinePlugin} from 'webpack'

const devServer: DevServerConfiguration = {}

const config: Configuration = {
  mode: 'development',
  devServer,
  entry: './src/index.ts',
  output: {
    filename: './public/output/index.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: true ? 'eval-cheap-module-source-map' : undefined,
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __DEV__: true,
      __FIEND_DEV__: false,
    }),
  ],
}

// module.exports
export default config
