/**
 * Checks if it's a client render,
 * which means it checks if window exists
 *
 */
const isClientRender = (): boolean => typeof window !== 'undefined';

export default isClientRender;
