--CREATE DATABASE bamazon_DB

CREATE TABLE products (
	--item_id  INTEGER NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (item_id),
	product_name VARCHAR(50), 
	department_name VARCHAR(50),
	price DECIMAL(50,2),
	stock_quantity INTEGER,
	product_sales DECIMAL(10,2)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ketchup", "Fruit", 5, 20), ("Milk","Drinks", 3.4,  11), ("coffee","Drinks", 6.9, 46), ("Apples","Fruit", 0.99, 358), ("Pinapple","Fruit", 11.67, 9), ("Beer","Drinks", 4.5, 41), ("Wine","Drinks", 17.8, 21), ("Tomatoes","Vegetables", 1.3, 67), ("Lemon","Fruit", 11.4, 34), ("Pepper","Vegetables", 6.2, 11);




CREATE TABLE departments (
--department_id INTEGER NOT NULL AUTO_INCREMENT,
PRIMARY KEY(department_id), 
department_name VARCHAR(100)NOT NULL, 
over_head_costs INTEGER
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Vegetables", 200) ,("Fruit", 300),("Drinks", 150),("Hygen", 300);