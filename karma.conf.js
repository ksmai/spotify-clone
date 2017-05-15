module.exports = function (config) {
  config.set({
    files: [
      './karma-test-shim.js',
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap'],
    },

    webpack: require('./webpack.test'),

    webpackMiddleware: {
      stats: 'errors-only',
    },

    webpackServer: {
      noInfo: true,
    },

    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['progress', 'kjhtml'],
    singleRun: true,
    autoWatch: false,
  });
};
