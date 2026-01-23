const express = require("express");
const _route = express.Router();


// ALL ORDERS
_route.get("/allorders", (req, res) => {
  const db = readDB();
  const orders = [];

  db.orders.forEach(order => orders.push(order));

  res.json({ count: orders.length, orders });
});

// CANCELLED ORDERS
_route.get("/cancelled-orders", (req, res) => {
  const db = readDB();
  const cancelled = db.orders.filter(o => o.status === "cancelled");
  res.json({ count: cancelled.length, orders: cancelled });
});

// SHIPPED ORDERS
_route.get("/shipped", (req, res) => {
  const db = readDB();
  const shipped = db.orders.filter(o => o.status === "shipped");
  res.json({ count: shipped.length, orders: shipped });
});

// TOTAL REVENUE BY PRODUCT
_route.get("/total-revenue/:productId", (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id == req.params.productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const revenue = db.orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId: product.id, totalRevenue: revenue });
});

// OVERALL REVENUE
_route.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const revenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return sum + o.quantity * product.price;
    }, 0);

  res.json({ totalRevenue: revenue });
});

module.exports = _route;
