// CREATE TABLE persons (
//   user_id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   email TEXT UNIQUE NOT NULL
// )


// CREATE TABLE productsNew(
//   product_id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   price NUMERIC(10, 2) NOT NULL CHECK(price >= 0),
//   stock INTEGER NOT NULL DEFAULT 0
// )


// CREATE TABLE ordersNew(
//   order_id SERIAL PRIMARY KEY,
//   user_id INT NOT NULL ,
//   product_id INT NOT NULL,
//   quantity INT NOT NULL,

// FOREIGN KEY(user_id) REFERENCES persons(user_id),
// FOREIGN KEY(product_id) REFERENCES productsnew(product_id)

// )

// INSERT INTO persons (name, email) VALUES 
// ('Tony', 'tony@gmail.com'),
// ('thor', 'thor@gmail.com'),
// ('Ant man', 'ant@gmail.com')

// select * from persons;

// INSERT INTO productsnew (name, price, stock) VALUES 
// ('Laptop', 80000, 10),
// ('Keyboard', 40000, 20),
// ('Mouse', 60000, 15)

// select * from productsnew;

// INSERT INTO ordersNew (user_id, product_id, quantity) VALUES 
// (1, 1, 2),
// (1, 2, 1),
// (1, 3, 1),
// (2, 2, 1),
// (2, 3, 1),
// (3, 1, 1),
// (3, 3, 2)


// select * from ordersNew;


// SELECT 
//   ordersNew.order_id,
//   persons.name AS user_name,
//   persons.email,
//   productsnew.name AS product_name,
//   productsnew.price,
//   ordersNew.quantity
// FROM ordersNew
// JOIN persons ON ordersNew.user_id = persons.user_id
// JOIN productsnew ON ordersNew.product_id = productsnew.product_id
// WHERE persons.user_id = 2


// // -- Total price per order  
// SELECT 
// ordersNew.order_id,
// (productsnew.price * ordersnew.quantity) AS total_price
// FROM ordersNew
// JOIN productsnew ON ordersNew.product_id = productsnew.product_id

// // -- Total spending per user
// SELECT 
// persons.name,
// SUM(productsnew.price * ordersNew.quantity) AS total_spending
// FROM ordersNew 
// JOIN persons ON ordersNew.user_id = persons.user_id
// JOIN productsnew ON ordersNew.product_id = productsnew.product_id
// GROUP BY persons.name

