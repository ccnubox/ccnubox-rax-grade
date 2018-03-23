// webpack.config.update.js
module.exports = function update(webpackConfig) {
  webpackConfig.entry["result.bundle"] = [
    "/Users/cairuyun/Desktop/Projects/ccnubox/ccnubox-rax-grade/ccnubox-rax-grade/node_modules/rax-scripts/lib/dev-utils/webpackHotDevClient.js",
    "/Users/cairuyun/Desktop/Projects/ccnubox/ccnubox-rax-grade/ccnubox-rax-grade/node_modules/rax-hot-loader/patch.js",
    "/Users/cairuyun/Desktop/Projects/ccnubox/ccnubox-rax-grade/ccnubox-rax-grade/src/result.js"
  ];
  console.log("here", webpackConfig);
  return webpackConfig;
};
