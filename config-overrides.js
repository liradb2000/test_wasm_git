const { getBabelLoader, addWebpackModuleRule } = require("customize-cra");

module.exports = {
  webpack: function override(config, env) {
    if (!config.plugins) {
      config.plugins = [];
    }
    const babelLoader = getBabelLoader(config);
    config = addWebpackModuleRule({
      test: /\.worker\.js$/,
      use: [
        {
          loader: "worker-loader",
          options: {
            worker: {
              type: "Worker",
              options: {
                type: "classic",
                credentials: "same-origin",
              },
            },
          },
        },
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
      ],
    })(config, env);

    return config;
  },
};
