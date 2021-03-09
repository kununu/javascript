module.exports = {
  extends: 'airbnb', // Many strict rules for ECMAScript and React

  parser: '@babel/eslint-parser',

  plugins: [
    '@babel',
    'react-hooks',
  ],

  env: {
    browser: true,
    jest: true,
  },

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.pact.js',
        '*/test-*/*.js',
        '*/test-*/*.jsx',
      ],
    }],
    'max-len': 'off', // Sometimes longer lines are more readable (Airbnb rule change)
    'no-param-reassign': ['error', {props: false}],
    'no-prototype-builtins': 'off', // Objects aren't created that don't extend from Object.prototype (Airbnb rule change)
    'object-curly-spacing': 'off', // Disabled in favor of @babel/object-curly-spacing in order to avoid false positives with ECMAScript modules (Airbnb rule change)
    'space-before-function-paren': ['error', {
      anonymous: 'always', // const foo = function () {}
      named: 'always', // function foo () {} (Airbnb rule change)
      asyncArrow: 'always', // const foo = async (a) => await a
    }],

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/no-direct-mutation-state': 'error', // Use .setState() always (Airbnb rule change)

    // https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin#rules
    '@babel/object-curly-spacing': 'error', // No spaces in single-line objects to make nested objects like {a: {b: 'c'}} look more sane (Airbnb rule change)

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/
    'import/order': ['error', { // Make import sort order an error (Airbnb rule change)
      'newlines-between': 'always',
      groups: [
        'builtin', // import fs from 'fs';
        'external', // import chalk from 'chalk';
        'internal', // import foo from 'src/foo';
        'parent', // import qux from '../qux';
        'sibling', // import bar from './bar';
        'index', // import main from './';
      ],
    }],

    'import/no-useless-path-segments': ['error', {
      'noUselessIndex': true,
    }],

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#rule-details
    // allow `Link` to have `to` and not the mandatory `href`
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
    }],

    // https://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': ['error', 'after'],

    // https://eslint.org/docs/rules/no-confusing-arrow
    // turn off to prevent conflict with
    // https://eslint.org/docs/rules/arrow-body-style
    'no-confusing-arrow': 'off',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    // 'label' tags need 'htmlFor' prop, but nesting is not required
    'jsx-a11y/label-has-for': ['error', {
      'required': 'id',
    }],

    // https://eslint.org/docs/rules/padding-line-between-statements
    // enforce empty lines after variable declarations
    'padding-line-between-statements': ['error', {
      'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*',
    }, {
      'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'],
    }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    // jsx props should be on separate lines each
    'react/jsx-max-props-per-line': ['error', {'maximum': 1}],

    // https://www.npmjs.com/package/eslint-plugin-react-hooks
    // enforces the rules of react-hooks (call at top level and only from functional components; checks dependencies)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // https://eslint.org/docs/rules/no-underscore-dangle
    // no underscores at either the beginning or end of an identifier
    'no-underscore-dangle': ['error', {'allow': ['__NEXT_DATA__', '__NEXT_REDUX_STORE__']}],

    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],

    // https://eslint.org/docs/rules/eol-last
    // require newline at the end of files
    'eol-last': ['error', 'always'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-default-props.md
    // enforce defaultProps declarations alphabetical sorting
    'react/jsx-sort-default-props': ['error', {
      'ignoreCase': true
    }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    // enforce props alphabetical sorting
    'react/jsx-sort-props': ['error', {
      'ignoreCase': true
    }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    // enforce propTypes declarations alphabetical sorting
    'react/sort-prop-types': ['error', {
      'ignoreCase': true
    }],

    // https://eslint.org/docs/rules/sort-keys
    // require object keys to be sorted
    'sort-keys': ['error', 'asc', {'caseSensitive': false, 'natural': false}],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
    // enforces where React component static properties should be positioned
    'react/static-property-placement': ['error', 'property assignment'],

    // https://eslint.org/docs/rules/indent
    // enforces a consistent 2 spaces indentation style
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
    // enforce the state initialization style to be either in a constructor or with a class property
    'react/state-in-constructor': 'off',
  },

  overrides: [{
    files: ['*.spec.js', '*.test.js', '*.pact.js', '*spec.jsx'],
    rules: {
      'global-require': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/jsx-props-no-spreading': 'off'
    }
  }]
};
