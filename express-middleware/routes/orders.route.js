const express = require('express');
const _route = express.Router()

_route.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Orders Data fetched successfully"
    })
});

_route.post("/", (req, res) => {
    res.status(201).json({
        status: true,
        message: "Orders Data Created successfully"
    })
});


module.exports = _route;