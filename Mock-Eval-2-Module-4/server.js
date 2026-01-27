const express = require('express');
const checkDatabaseConnection = require('./src/utils/dbHealthCheck');
const { ConsumersRoute, OrdersRoute } = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 4578;

app.use(express.json());

app.use('/customers', ConsumersRoute);
app.use('/orders', OrdersRoute);

(async () => {
    const isDbConnected = await checkDatabaseConnection();

    if (!isDbConnected) {
        console.log("Server not started due to DB connection failure");
        process.exit(1)
    }

    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
})();