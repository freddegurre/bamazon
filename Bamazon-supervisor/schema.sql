--CREATE DATABASE bamazon_DB

CREATE TABLE products (
	--item_id  INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (item_id),
	product_name VARCHAR(50), 
	department_name VARCHAR(50),
	price DECIMAL(50,2),
	stock_quantity INTEGER
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Ketchup", 5, 89), ("Milk", 3.4, 11), ("Nutella", 8.4, 34), ("coffee", 6.9, 46), ("Apples", 0.99, 358), ("Cheese", 11.67, 71), ("Beer", 4.5, 41), ("Wine", 17.8, 21), ("Tomatoes", 1.3, 67), ("Pinapple", 11.4, 34); 

CREATE TABLE departments (
--department_id INTEGER NOT NULL AUTO_INCREMENT,
PRIMARY KEY(department_id), 
department_name VARCHAR(100)NOT NULL, 
over_head_costs INTEGER
);

