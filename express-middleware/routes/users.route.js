const express = require('express');
const checkCredentials = require('../middlewares/checkValidation.middleware');
const _route = express.Router();

_route.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "Users Data fetched successfully"
    })
});

_route.post("/", checkCredentials, (req, res) => {
    const { name, email } = req.body;

    const data = { name, email }

    res.status(201).json({
        status: true,
        message: "Users Data Created successfully",
        data
    })
});

module.exports = _route;



































