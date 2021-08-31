import camelize from 'camelize';
import getConfig from 'next/config';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';

const {
  publicRuntimeConfig: {
    server: {name: application},
  },
} = getConfig();

const getParsedCookie = (
  cookies: Record<string, string>,
  cookieId: string,
): {accessToken: string} => {
  /** check if json cookie is valid, when not, set cookie to null */
  if (cookies[cookieId]) {
    try {
      const jsonParsed = JSON.parse(cookies[cookieId]);

      return camelize(jsonParsed);
    } catch (exception) {
      logger.error({
        application,
        context: {exception},
        message: `Failed parsing cookie ${cookieId}`,
      });
    }
  }
  return null;
};

export default getParsedCookie;
