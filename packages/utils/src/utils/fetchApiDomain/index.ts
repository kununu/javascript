// The domain is dependent on if the isomorphic fetch is done on the server or on the client. On the server the node-fetch does not know what the domain is so we must specify it. However, on the client it does.
import isClientRender from '../isClientRender';

const fetchApiDomain = (): string => isClientRender() ? '' : process.env.BFF_URL;

export const getBFFURL = (endpoint: string): string => `/middlewares${endpoint}`;

export default fetchApiDomain;
