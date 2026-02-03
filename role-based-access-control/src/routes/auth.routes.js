const express = require('express');
const { signup, login } = require('../controllers/auth.controller');

const _route = express.Router();

_route.post("/signup", signup);

_route.post('/login', login)

module.exports = _route