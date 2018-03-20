var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    start()
});
//Start application
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Fredriks Mini Market! would you like to shop?",
            choices: ["Yes", "No"],
            name: "command"
        }
    ]).then(function (command) {
        switch (command.command) {
            case "Yes":
                console.log("-------------")
                console.log("Here is a list of our products!")
                console.log("-------------")
                readProduct(letsShop);

                break;

            case "No":
                console.log("-------------")
                console.log("Hope to see you soon!")
                console.log("-------------")
                connection.end();
                break;
        }
    });
}

//Load and display all products from DB 
function readProduct(cb) {
    connection.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
        console.log("----------Inventory--------")
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].item_id + " | Product: " + results[i].product_name + " | Price: " + results[i].price);
        }
        console.log("----------Inventory--------")
        cb();
    });
}
//Logic for shooping al the shopping is done on ID of product
function letsShop() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you would like to buy??",
            name: "purchase"
        }
    ]).then(function (what) {
        //Make DB query with given ID by user return product name 
        connection.query('SELECT item_id, product_name FROM products WHERE ?',
            {
                item_id: what.purchase

            }, function (error, results, fields) {
                //ask how many of the chose product user wants
                inquirer.prompt([
                    {
                        type: "input",
                        message: "How many " + results[0].product_name,
                        name: "quantity"
                    }
                ]).then(function (input) {
                    //Based on quantity return price to user, and update DB with new inventory and add totSale price to product.
                    connection.query('SELECT * FROM products WHERE ?',
                        {
                            item_id: what.purchase
                        },
                        function (error, results, fields) {
                            //if the requested quantity is less then stock quantity in DB, make sale update stock in DB,
                            if (input.quantity < results[0].stock_quantity) {
                                var newStock = results[0].stock_quantity - input.quantity;
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [{ stock_quantity: newStock }, { item_id: what.purchase }]
                                )
                                //get price for user
                                var price = input.quantity * results[0].price;
                                //Increase total sales in DB for product
                                var totSales = price + results[0].product_sales
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [{ product_sales: totSales }, { item_id: what.purchase }]
                                )
                                console.log("-------------");
                                console.log("Thanks for buying " + results[0].product_name + "  your total price is " + price);
                                console.log("-------------");
                            }
                            //if quantity is more then stock quantity in DB
                            if (input.quantity > results[0].stock_quantity) {
                                console.log("We only have " + results[0].stock_quantity + " left");
                            }
                            
                            connection.end();
                        })
                })

            })

    });
}
