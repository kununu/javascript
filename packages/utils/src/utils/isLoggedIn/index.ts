/**
 * Checks in the roles of a logged in user,
 * if the ROLE_MEMBER is available, which indicates a
 * logged in User
 *
 * @params {Array[string]} roles
 * @returns {bool}
 */
const isLoggedIn = (roles: Array<string>): boolean => roles.some(role => role === 'ROLE_MEMBER');

export default isLoggedIn;
