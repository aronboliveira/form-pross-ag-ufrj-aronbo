module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
          node: "current",
          browsers: "last 1 version",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@src": "../../globalScripts/src",
        },
      },
    ],
    [
      "@babel/plugin-transform-modules-commonjs",
      {
        pattern: "../../globalScripts/src",
        replacement: "../../globalScripts/dist",
      },
    ],
  ],
};
