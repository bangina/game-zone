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
            cardpicker: argv.mode === "development" ? "cardpicker@http://localhost:3001/remoteEntry.js" : "cardpicker@https://cardpicker.vercel.app/remoteEntry.js",
            topnumber: argv.mode === "development" ? "topnumber@http://localhost:3002/remoteEntry.js" : "topnumber@https://topnumber.vercel.app/remoteEntry.js",
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
