const express = require("express");

const next = require("next");

const getMiddlewares = require("./middlewares");

const isAliveHandler = require("./handlers/isAliveHandler");

const staticResourceHandler = require("./handlers/staticResourceHandler");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const nextServer = (config) => {
  const handler = app.getRequestHandler();

  const { appPrefix, application } = config;

  const server = express();
  // Register all the middlewares that will be executed in every request
  server.use(getMiddlewares(application));

  // Register all internal routes that aren't handle by nextJS
  server.get(`${appPrefix}/isalive`, isAliveHandler);

  // Set cache header for static resources - it can be long, since bundles should contain unique id
  if (process.env.NODE_ENV === "production") {
    // Found here: https://github.com/zeit/next.js/issues/4105
    // /^\/app-sitemaps\/_next\/static\/(images|css)\//,
    server.get(/^\/_next\/static\/(images|css)\//, staticResourceHandler);
  }

  // Needs to always be internal, so that "/app-sitemaps" routes can be resolved
  server.use(appPrefix, handler);

  return { server, app };
};

module.exports = nextServer;
