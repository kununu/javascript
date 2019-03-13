# eslint-config-kununu

@kununu's ESLint config.

## Install

This contains ESLint rules for ECMAScript 6+ and React. It requires `eslint`, `babel-eslint`,`eslint-plugin-babel`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, and `eslint-import-resolver-alias` as peer dependencies.

1. Add these npm packages as dev dependencies to your project:
  ```
  npx install-peerdeps --dev @kununu/eslint-config
  ```
  Alternatively you can install the peer dependencies manually like this:
  ```
  npm install --save-dev @kununu/eslint-config babel-eslint@10.0.1 eslint@5.15.1 eslint-plugin-babel@5.3.0 eslint-plugin-import@2.16.0 eslint-plugin-jsx-a11y@6.2.1 eslint-plugin-react@7.12.4 eslint-import-resolver-alias@1.1.2
  ```

2. Add `"extends": "@kununu"` to your .eslintrc
