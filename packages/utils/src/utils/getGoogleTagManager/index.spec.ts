import {getGoogleTagManager, getGoogleTagManagerNoScript} from '.';

describe('GTM function', () => {
  const googleTagManagerId = 'GTM-XXXXX';

  it('should return GTM function without errors', () => {
    const gtm = getGoogleTagManager(googleTagManagerId);

    expect(gtm).toMatchSnapshot();
  });
  it('should return GTM no-script frame without errors', () => {
    const gtm = getGoogleTagManagerNoScript(googleTagManagerId);

    expect(gtm).toMatchSnapshot();
  });
});
