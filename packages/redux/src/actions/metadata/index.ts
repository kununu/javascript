import {logger} from '@kununu/kununu-utils/dist/kununu-logger';
import {fetchApi} from '@kununu/utils';

export const RECEIVE_META = 'RECEIVE_META';

type ReturnDataProps = {
  payload: {data: Record<string, unknown>};
  type: string;
};

export function receiveMeta (data: Record<string, unknown>): ReturnDataProps {
  return {
    payload: {data},
    type: RECEIVE_META,
  };
}

export function fetchMeta (
  application: string,
  countryCode: string,
  headers = {},
): (dispatch) => Promise<void> {
  return async dispatch => {
    try {
      const result = await dispatch(
        fetchApi(
          '/meta',
          {countryCode},
          {credentials: 'same-origin', headers},
          10000,
          true,
        ),
      );

      dispatch(receiveMeta(result));
    } catch (error) {
      logger.error({
        application,
        context: {error},
        message: 'Error fetching metadata',
      });
    }
  };
}
