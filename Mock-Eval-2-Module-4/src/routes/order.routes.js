const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/order.controller');
const _route = express.Router();

_route.post('/', createOrder);

_route.get('/', getOrders);

_route.put('/:orderId', updateOrder);

_route.delete('/:orderId', deleteOrder);

module.exports = _route