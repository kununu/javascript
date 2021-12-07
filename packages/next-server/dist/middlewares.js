"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var checkReferrer_1 = __importDefault(require("@kununu/kununu-utils/dist/middlewares/checkReferrer"));
var expressLogger_1 = __importDefault(require("@kununu/kununu-utils/dist/middlewares/expressLogger"));
var getMiddlewares = function (application) { return [
    (0, helmet_1.default)({
        contentSecurityPolicy: false,
    }),
    (0, cookie_parser_1.default)(),
    body_parser_1.default.json(),
    (0, compression_1.default)(),
    (0, checkReferrer_1.default)(),
    (0, expressLogger_1.default)(application),
]; };
exports.default = getMiddlewares;
