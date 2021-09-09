import isClientRender from '.';

describe('isClientRender', () => {
  const {window} = global;

  it('should return false because window is undefined', () => {
    delete global.window;
    expect(isClientRender()).toBeFalsy();
  });

  it('should return true because window is defined', () => {
    global.window = window;
    expect(isClientRender()).toBeTruthy();
  });
});
