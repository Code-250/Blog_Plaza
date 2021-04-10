module.exports = {
  env: {
    es2021: true,
    commonJS: true,
    node: true,
    mocha: true,
  },
  extends: ["airbnb-base,'prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "commonJs",
  },
  rules: {},
};