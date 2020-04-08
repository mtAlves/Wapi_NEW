const path = require('path')

module.exports = {
  entry: './src/index.ts',
  mode: process.env.MODE ? process.env.MODE : 'production',
  node: { net: 'empty', tls: 'empty', fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'injectWAPI',
  },
}
