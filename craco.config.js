// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const { CycloneDxWebpackPlugin } = require("@cyclonedx/webpack-plugin");

/** @type {import('@cyclonedx/webpack-plugin').CycloneDxWebpackPluginOptions} */

const cycloneDxWebpackPluginOptions = {
  outputLocation: "./bom",
  reproducibleResults: true,
  validateResults: true
};

module.exports = {
  webpack: {
    plugins: {
      add: [new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)]
    }
  }
};
