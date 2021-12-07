"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var middlewares_1 = __importDefault(require("./middlewares"));
var isAliveHandler_1 = __importDefault(require("./handlers/isAliveHandler"));
var staticResourceHandler_1 = __importDefault(require("./handlers/staticResourceHandler"));
var dev = process.env.NODE_ENV !== 'production';
var app = (0, next_1.default)({ dev: dev });
var nextServer = function (config) {
    var handler = app.getRequestHandler();
    var appPrefix = config.appPrefix, application = config.application;
    var server = (0, express_1.default)();
    server.set('case sensitive routing', true);
    // Register all the middlewares that will be executed in every request
    server.use((0, middlewares_1.default)(application));
    console.log('here');
    // Register all internal routes that aren't handle by nextJS
    server.get("".concat(appPrefix, "/isalive"), isAliveHandler_1.default);
    // Set cache header for static resources - it can be long, since bundles should contain unique id
    if (process.env.NODE_ENV === 'production') {
        // Found here: https://github.com/zeit/next.js/issues/4105
        server.get(/^\/_next\/static\/(images|css)\//, staticResourceHandler_1.default);
    }
    // Needs to always be internal, so that "/app-sitemaps" routes can be resolved
    // @ts-ignore
    server.use(appPrefix, handler);
    return { app: app, server: server };
};
exports.default = nextServer;
