import isLoggedIn from '.';

describe('isLoggedIn', () => {
  const defaultRoles = ['USER', 'ADMIN'];

  it('should return true because it is a ROLE_MEMBER', () => {
    expect(isLoggedIn([...defaultRoles, 'ROLE_MEMBER'])).toBeTruthy();
  });

  it('should return false because it is not a ROLE_MEMBER', () => {
    expect(isLoggedIn(defaultRoles)).toBeFalsy();
  });
});
