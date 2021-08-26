const isClientRender = (): boolean => typeof window !== 'undefined';

export default isClientRender;
