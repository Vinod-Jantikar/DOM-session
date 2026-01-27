const express = require('express');
const { registerUser, getUsers, getSingleUserData, updateUser, deleteUser } = require('../controllers/customer.controller');

const _route = express.Router();

_route.post('/', registerUser);

_route.get('/', getUsers)

_route.get("/:userId", getSingleUserData )

_route.put("/:userId", updateUser )

_route.delete("/:userId", deleteUser )

module.exports = _route