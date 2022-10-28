"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _config = require("./config");

//minuto 40
var pool = new _pg["default"].Pool(_config.config);
exports.pool = pool;