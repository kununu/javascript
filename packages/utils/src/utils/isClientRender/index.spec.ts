import isClientRender from '.';

describe('isClientRender', () => {
  const {window} = global;

  it('should return false becauwe window is undefined', () => {
    delete global.window;
    expect(isClientRender()).toBeFalsy();
  });

  it('should return true becauwe window is defined', () => {
    global.window = window;
    expect(isClientRender()).toBeTruthy();
  });
});
