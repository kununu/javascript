import express from 'express';
import next from 'next';

import getMiddlewares from './middlewares';
import isAliveHandler from './handlers/isAliveHandler';
import staticResourceHandler from './handlers/staticResourceHandler';

export interface INextServer {
    app: any,
    server: any
}

interface IConfig {
    application: string,
    appPrefix: string
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const nextServer = (config: IConfig): INextServer => {
    const handler = app.getRequestHandler();

    const {appPrefix, application} = config;

    const server = express();

    server.set('case sensitive routing', true);

    // Register all the middlewares that will be executed in every request
    server.use(getMiddlewares(application));

    console.log('here')

    // Register all internal routes that aren't handle by nextJS
    server.get(`${appPrefix}/isalive`, isAliveHandler);

    // Set cache header for static resources - it can be long, since bundles should contain unique id
    if (process.env.NODE_ENV === 'production') {
        // Found here: https://github.com/zeit/next.js/issues/4105
        server.get(/^\/_next\/static\/(images|css)\//, staticResourceHandler);
    }

    // Needs to always be internal, so that "/app-sitemaps" routes can be resolved
    // @ts-ignore
    server.use(appPrefix, handler);

    return {app, server};
};

export default nextServer;
