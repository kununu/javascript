import isClientRender from '../isClientRender';

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...(isClientRender() && (window as any)?.__NEXT_DATA__?.props?.pageProps?.locale ?
    {'X-Lang': (window as any)?.__NEXT_DATA__?.props?.pageProps?.locale} : {}), // this create the X-Lang Header as default for all client side requests.
};

/**
 * This function generates a header object with our default Headers
 * and other supplied headers
 *
 * @param {Object} headers
 */
export default function setApiHeaders (headers = {}): Record<string, string> {
  return {
    ...defaultHeaders,
    ...headers,
  };
}
