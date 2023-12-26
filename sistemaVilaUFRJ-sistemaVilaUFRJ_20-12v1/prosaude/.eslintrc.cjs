module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true, // Adicionei o ambiente Node.js
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "react-app", // Remova esta linha se não for um projeto Create React App
  ],
  ignorePatterns: ["dist", ".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
