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
    console.log("connected as id " + connection.threadId);

});
//
function readProduct(delay) {
    connection.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
        console.log("----------Inventory--------")
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].item_id + " | Product " + results[i].product_name + " | Price " + results[i].price);
        }
        console.log("----------Inventory--------")
        delay();
    });
}
readProduct(function () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you would like to buy??",
            name: "purchase"
        }
    ]).then(function (what) {   

        connection.query('SELECT item_id, product_name FROM products WHERE ?',
            {
                item_id: what.purchase

            }, function (error, results, fields) {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "How many " + results[0].product_name,
                        name: "quantity"
                    }
                ]).then(function (input) {

                    connection.query('SELECT * FROM products WHERE ?',
                        {
                            item_id: what.purchase
                        },
                        function (error, results, fields) {
                            if (input.quantity < results[0].stock_quantity) {
                                var newStock = results[0].stock_quantity - input.quantity;
                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [{ stock_quantity: newStock }, { item_id: what.purchase }]
                                )
                                var price = input.quantity * results[0].price;
                                console.log("Thanks for buying " + results[0].product_name + "  your total price is " + price);
                               
                            }
                            if (input.quantity > results[0].stock_quantity) {
                                console.log("We only have " + results[0].stock_quantity + " left"); 
                            }
                            connection.end();
                        }) 
                })

            })

    });
});

