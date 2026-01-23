require('dotenv').config();
const express = require('express');
const { ProductsRoute, OrdersRoute, AnalyticsRoute } = require('./routes');

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5685;

app.use("/products", ProductsRoute);
app.use("/orders", OrdersRoute);
app.use("/analytics", AnalyticsRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})