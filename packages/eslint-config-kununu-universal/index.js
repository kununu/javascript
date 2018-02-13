module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'babel',
  ],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'max-len': 'off', // Sometimes longer lines are more readable (Airbnb rule change)
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
    'class-methods-use-this': ['error', {
      exceptMethods: [
        // React lifecycle methods
        // https://github.com/airbnb/javascript/blob/8468ed842314a5d66816927ba6c35f018035cffc/packages/eslint-config-airbnb/rules/react.js#L23-L33
        'render',
        'getInitialState',
        'getDefaultProps',
        'getChildContext',
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
      ],
    }],
  },
};
