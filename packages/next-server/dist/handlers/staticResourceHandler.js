"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var staticResourceHandler = function (req, res, nextHandler) {
    res.header('cache-control', 'public, max-age=31536000, immutable');
    nextHandler();
};
exports.default = staticResourceHandler;
