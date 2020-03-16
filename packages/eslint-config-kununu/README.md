# @kununu/eslint-config

> kununu config for ESLint

This package contains ESLint rules for consistent JS and JSX code across kununu's projects.

## 📦 Installation

Add @kununu/eslint-config npm package as dev dependency to your project:
```console
npx install --save-dev @kununu/eslint-config
```

## 💻 Usage

Create a `.eslintrc` file with the following configuration:

```yaml
{
  "extends": "@kununu/eslint-config"
}
```

See [docs](https://eslint.org/docs/user-guide/getting-started) to find more detailed information on ESLint configuration and usage.

## ⚡️ Plugins

At kununu, [@kununu/eslint-config](https://www.npmjs.com/package/@kununu/eslint-config) and [@kununu/stylelint-config](https://www.npmjs.com/package/@kununu/stylelint-config) linters runs on every commit, but finding a lint error after push can be frustrating and waste time. In order to avoid it, editor plugins are available to warn you and validate as you code.

There's what we use and recommend:

**Visual Code Studio**
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**Atom**
- [linter-eslint](https://atom.io/packages/linter-eslint)