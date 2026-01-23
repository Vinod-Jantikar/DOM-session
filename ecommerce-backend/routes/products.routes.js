const express = require('express');
const { readDB, writeDB } = require('../utils/db');
const _route = express.Router();

_route.post("/", (req, res) => {
    const db = readDB();
    const newProduct = {
        id: db.products.length + 1,
        ...req.body
    };

    db.products.push(newProduct);
    writeDB(db);

    res.status(201).json({ success: true, product: newProduct });
});


_route.get("/", (req, res) => {
  const db = readDB();
  res.json({ success: true, products: db.products });
});

module.exports = _route