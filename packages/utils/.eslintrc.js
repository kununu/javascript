module.exports = {
  extends: [
    '@kununu/eslint-config',
  ],
  parserOptions: {
    project: './tsconfig.json',
    requireConfigFile: false,
    tsconfigRootDir: __dirname,
  },
};
