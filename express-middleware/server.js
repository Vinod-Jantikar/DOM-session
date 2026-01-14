const express = require('express');
const { userRoutes, orderRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/order", orderRoutes);


app.listen(5865, () => {
    console.log("Server is up and running on the port 5865.");
});