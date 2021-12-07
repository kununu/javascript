import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import checkReferrer from '@kununu/kununu-utils/dist/middlewares/checkReferrer';
import expressLogger from '@kununu/kununu-utils/dist/middlewares/expressLogger';

const getMiddlewares = (application: string): any => [
  helmet({
    contentSecurityPolicy: false,
  }),
  cookieParser(),
  bodyParser.json(),
  compression(),
  checkReferrer(),
  expressLogger(application),
];

export default getMiddlewares;
