require('dotenv').config();
const express = require('express');
const dbHealtCheck = require('./src/utils/dbHealthCheck');
const _route = require('./src/routes/auth.routes');
const { authenticate, authorizedRoled } = require('./src/middlewares/auth.middleware');
const app = express();

const PORT = process.env.PORT || 5874;
app.use(express.json());

app.use('/api', _route);

app.use("/products", authenticate, authorizedRoled(["ADMIN", "USER"]), require("./src/routes/products.routes"));

app.listen(PORT, async () => {
    try {
        await dbHealtCheck();
        console.log(`Server listening on port ${PORT}`);
    } catch (error) {
        console.log("Error occured while starting the server.");
    }
})