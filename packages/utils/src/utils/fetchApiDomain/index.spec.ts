import fetchApiDomain, {getBFFURL} from '.';

describe('fetchApiDomain', () => {
  const {window} = global;

  it('should return empty string because the window is undefined', () => {
    delete global.window;
    expect(fetchApiDomain()).toBe('ambassador');
  });

  it('should return empty string because window is defined', () => {
    global.window = window;
    expect(fetchApiDomain()).toBe('');
  });
});

describe('getBFFURL', () => {
  it('should return the bff url', () => {
    expect(getBFFURL('/ambassador')).toBe('/middlewares/ambassador');
  });
});
