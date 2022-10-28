"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLocation = exports.getLocationsCount = exports.getLocations = exports.getLocation = exports.deleteLocation = exports.createLocation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getLocations = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var connection;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database.pool.query('SELECT * FROM tbl_patrullas');

          case 2:
            connection = _context.sent;
            console.log(connection.rows);
            res.json(connection.rows);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLocations(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getLocations = getLocations;

var getLocationsCount = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var connection;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database.pool.query('SELECT COUNT(*) FROM tbl_patrullas');

          case 2:
            connection = _context2.sent;
            res.json(connection.rows[0]["count"]);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getLocationsCount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getLocationsCount = getLocationsCount;

var getLocation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, connection;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _database.pool.query('SELECT * FROM tbl_patrullas WHERE id = $1', [id]);

          case 3:
            connection = _context3.sent;
            res.json(connection.rows[0]);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getLocation(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getLocation = getLocation;

var createLocation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var unidad, oficial, lat, _long, fecha, of, sof, slc, fuerza, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            unidad = req.body.unidad;
            oficial = req.body.oficial;
            lat = req.body.lat;
            _long = req.body["long"];
            fecha = req.body.fecha;
            of = req.body.of;
            sof = req.body.sof;
            slc = req.body.slc;
            fuerza = req.body.fuerza;
            _context4.next = 11;
            return _database.pool.query('INSERT INTO geoloc_unidad(unidad, oficial, lat, long, fecha, of, sof, slc, fuerza) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [unidad, oficial, lat, _long, fecha, of, sof, slc, fuerza]);

          case 11:
            result = _context4.sent;
            console.log(result);
            res.json(_objectSpread({
              id: result.id
            }, req.body));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createLocation(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createLocation = createLocation;

var deleteLocation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _database.pool.query('DELETE FROM tbl_patrullas WHERE id = $1', [id]);

          case 3:
            result = _context5.sent;
            res.sendStatus(204);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteLocation(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteLocation = deleteLocation;

var updateLocation = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, unidad, oficial, lat, _long2, fecha, result;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            unidad = req.body.unidad;
            oficial = req.body.oficial;
            lat = req.body.lat;
            _long2 = req.body["long"];
            fecha = req.body.fecha;
            _context6.next = 8;
            return _database.pool.query('UPDATE tbl_patrullas SET unidad = $1, oficial = $2, lat = $3, long = $4, fecha = $5 WHERE id = $6', [unidad, oficial, lat, _long2, fecha, id]);

          case 8:
            result = _context6.sent;
            res.sendStatus(204);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateLocation(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateLocation = updateLocation;