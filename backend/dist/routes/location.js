"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _location = require("../controllers/location");

var router = (0, _express.Router)();
router.get('/locations', _location.getLocations);
router.get('/locations/count', _location.getLocationsCount);
router.get('/locations/:id', _location.getLocation);
router.post('/locations', _location.createLocation);
router["delete"]('/locations/:id', _location.deleteLocation);
router.put('/locations/:id', _location.updateLocation);
var _default = router;
exports["default"] = _default;