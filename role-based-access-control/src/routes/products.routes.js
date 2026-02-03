const express = require('express');
const getProducts = require('../controllers/product.controller');

const _route = express.Router();

_route.get("/", getProducts);

module.exports = _route