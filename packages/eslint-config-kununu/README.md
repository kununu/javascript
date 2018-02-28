# eslint-config-kununu

@kununu's ESLint config.

## Install

This contains ESLint rules for ECMAScript 6+, React and Flow. It requires `eslint`, `eslint-plugin-babel`, `eslint-plugin-flowtype`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react`.

1. Add these npm packages as dev dependencies to your project:
  ```sh
  (
    export PKG=@kununu/eslint-config;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  Which produces and runs a command like:

  ```sh
  npm install --save-dev @kununu/eslint-config eslint@^#.#.# eslint-plugin-babel@^#.#.# eslint-plugin-flowtype@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-jsx-a11y@^#.#.# eslint-plugin-react@^#.#.#
  ```

2. Add `"extends": "@kununu"` to your .eslintrc
