"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAliveHandler = function (req, res) {
    res.header('cache-control', 'private, no-cache, max-age=0'); // ETOE-TEST
    res.json({ build: process.env.BUILD_NAME || 'local development' });
};
exports.default = isAliveHandler;
