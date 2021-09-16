import camelize from 'camelize';
import {logger} from '@kununu/kununu-utils/dist/kununu-logger';

/**
 * Checks if json cookie is valid, when not, sets cookie to null
 *
 * @param {Object} cookies
 * @param {string} cookieId
 * @param {string} application
 */
const getParsedCookie = (
  cookies: Record<string, string>,
  cookieId: string,
  application: string,
): {accessToken: string} => {
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
