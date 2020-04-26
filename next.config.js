const path = require("path");

module.exports = {
  webpack: function (config) {
    // Alias
    config.resolve.alias["~"] = path.resolve(__dirname);

    // Styletron
    config.externals = config.externals || {};
    config.externals["styletron-server"] = "styletron-server";

    return config;
  },
};
