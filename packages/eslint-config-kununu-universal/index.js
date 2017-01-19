module.exports = {
  extends: 'karlhorky',
  rules: {
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

        // React Server methods
        'handleRoute',
        'getTitle',
        'getScripts',
        'getSystemScripts',
        'getHeadStylesheets',
        'getMetaTags',
        'getLinkTags',
        'getBase',
        'getBodyClasses',
        'getElements',
        'getResponseData',
        'getHttpHeaders',
      ],
    }],
  },
};
