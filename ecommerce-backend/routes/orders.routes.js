const express = require("express");
const { readDB, writeDB } = require("../utils/db");
const _route = express.Router();

// CREATE ORDER
_route.post("/", (req, res) => {
    const { productId, quantity } = req.body;
    const db = readDB();

    const product = db.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock === 0 || quantity > product.stock) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    const order = {
        id: db.orders.length + 1,
        productId,
        quantity,
        totalAmount: product.price * quantity,
        status: "placed",
        createdAt: new Date().toISOString().split("T")[0]
    };

    product.stock -= quantity;
    db.orders.push(order);

    writeDB(db);
    res.status(201).json({ success: true, order });
});

// GET ALL ORDERS
_route.get("/", (req, res) => {
    const db = readDB();
    res.json({ success: true, orders: db.orders });
});

// CANCEL ORDER (SOFT DELETE)
_route.delete("/:orderId", (req, res) => {
    const db = readDB();
    const order = db.orders.find(o => o.id == req.params.orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status === "cancelled") {
        return res.status(400).json({ message: "Order already cancelled" });
    }

    const today = new Date().toISOString().split("T")[0];
    if (order.createdAt !== today) {
        return res.status(400).json({ message: "Cancellation not allowed" });
    }

    order.status = "cancelled";
    const product = db.products.find(p => p.id === order.productId);
    product.stock += order.quantity;

    writeDB(db);
    res.json({ success: true, message: "Order cancelled" });
});

// CHANGE ORDER STATUS
_route.patch("/change-status/:orderId", (req, res) => {
    const db = readDB();
    const order = db.orders.find(o => o.id == req.params.orderId);
    const { status } = req.body;

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (["cancelled", "delivered"].includes(order.status)) {
        return res.status(400).json({ message: "Status change not allowed" });
    }

    const flow = ["placed", "shipped", "delivered"];
    if (flow.indexOf(status) !== flow.indexOf(order.status) + 1) {
        return res.status(400).json({ message: "Invalid status flow" });
    }

    order.status = status;
    writeDB(db);
    res.json({ success: true, order });
});

module.exports = _route;
