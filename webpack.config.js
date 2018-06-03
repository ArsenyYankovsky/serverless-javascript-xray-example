const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals')
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'imports-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'stage-2',
            ],
          },
        },
      ],
    }],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
}
