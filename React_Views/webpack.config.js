// For info about this file refer to webpack and webpack-hot-middleware documentation
// Rather than having hard coded webpack.config.js for each environment, this
// file generates a webpack config for the environment passed to the getConfig method.
import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const developmentEnvironment = 'development';
const testEnvironment = 'test';
const productionEnvironment = 'production';

const getPlugins = function(env) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env == developmentEnvironment
  };

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS) //Passes variables to Webpack. https://facebook.github.io/react/downloads.html
  ];

  switch(env) {
    case productionEnvironment:
      plugins.push(new ExtractTextPlugin('styles.css'));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: false, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: false}
      }));
      break;
    case developmentEnvironment:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }

  return plugins;
};

const getEntry = function(env) {
  const entry = [];

  if (env == developmentEnvironment) { //only want hot reloading when in dev.
    entry.push('eventsource-polyfill'); // necessary for hot reloading with IE 
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  entry.push('./src/index');
  return entry;
};

const getLoaders = function(env) {
    const loaders = [ { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint'] } ];

  if (env == productionEnvironment) {
    //generate separate physical stylesheet for production build using ExtractTextPlugin. This provides separate caching and avoids a flash of unstyled content on load.
      loaders.push({ test: /(\.css|\.scss)$/, include: path.join(__dirname, 'src'), loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap") });
  } else {
      loaders.push({ test: /(\.css|\.scss)$/, include: path.join(__dirname, 'src'), loaders: ['style', 'css?sourceMap', 'sass?sourceMap']});
      loaders.push({ test: /(\.gif)$/, loaders: ['file-loader']});
      loaders.push({ test: /(\.png)$/, loaders: ['file-loader']});
  }

  return loaders;
};

//Webpack uses this chunk of JSON for configuration.
//The functions above are useful for configuring Webpack
//for different environments.
//NOTE: The resolve section at the bottom is necessary
//to keep material-ui happy by assuring all references
//to React point to the same spot.
module.exports = function getConfig(env) {
  return {
    debug: true,
    devtool: env == productionEnvironment ? 'source-map' : 'cheap-source-map', //more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, //set to false to see a list of every file being bundled.
    entry: getEntry(env),
    target: env == testEnvironment ? 'node' : 'web', //necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
      path: __dirname + '/dist', //Note: Physical files are only output by the production build task `npm run build`.
      publicPath: '',
      filename: 'bundle.js'
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env)
    },
    resolve: {
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
      extensions: ['', '.js']
    }
  };
};
