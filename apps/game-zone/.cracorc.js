const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "gamezone",
          filename: "remoteEntry.js",
          remotes: {
            cardpicker: "cardpicker@https://game-zone-cardpicker.vercel.app/remoteEntry.js",
            topnumber: "topnumber@https://game-zone-topnumber.vercel.app/remoteEntry.js",
          },
          shared: {
            ...deps,
            ui: {
              singleton: true,
            },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
});
