module.exports = {
  extends: 'airbnb', // Many strict rules for ECMAScript and React

  parser: 'babel-eslint',

  plugins: [
    'babel',
  ],

  env: {
    browser: true,
    jest: true,
  },

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.pact.js',
        '*/test-*/*.js',
      ],
    }],
    'max-len': 'off', // Sometimes longer lines are more readable (Airbnb rule change)
    'no-param-reassign': ['error', {props: false}],
    'no-prototype-builtins': 'off', // Objects aren't created that don't extend from Object.prototype (Airbnb rule change)
    'object-curly-spacing': 'off', // Disabled in favor of babel/object-curly-spacing in order to avoid false positives with ECMAScript modules (Airbnb rule change)
    'space-before-function-paren': ['error', {
      anonymous: 'always', // const foo = function () {}
      named: 'always', // function foo () {} (Airbnb rule change)
      asyncArrow: 'always', // const foo = async (a) => await a
    }],

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/no-direct-mutation-state': 'error', // Use .setState() always (Airbnb rule change)
    'react/jsx-filename-extension': 'off', // Don't require .jsx file extension for files with JSX in them (Airbnb rule change)

    // https://github.com/babel/eslint-plugin-babel#rules
    'babel/object-curly-spacing': 'error', // No spaces in single-line objects to make nested objects like {a: {b: 'c'}} look more sane (Airbnb rule change)

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
    'jsx-a11y/label-has-for': [ 2, {
      'required': 'id',
    }],
  },
};
