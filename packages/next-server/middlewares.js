const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const checkReferrer =
  require("@kununu/kununu-utils/dist/middlewares/checkReferrer").default;
const expressLogger =
  require("@kununu/kununu-utils/dist/middlewares/expressLogger").default;

const getMiddlewares = (application) => [
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
