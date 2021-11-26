/* eslint-disable */
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const checkReferrer = require('@kununu/kununu-utils/dist/middlewares/checkReferrer');
const expressLogger = require('@kununu/kununu-utils/dist/middlewares/expressLogger');

export const getMiddlewares = (application: string): any => [
  helmet({
    contentSecurityPolicy: false,
  }),
  cookieParser(),
  bodyParser.json(),
  compression(),
  checkReferrer(),
  expressLogger(application),
];

module.exports = getMiddlewares;
