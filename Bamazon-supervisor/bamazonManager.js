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
    start();
});

function start () {
inquirer.prompt([
    {
      type: "list", 
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"], 
      name: "command"  
    }
]).then(function (command){
    switch (command.command) {
        case "View Products for Sale":
            console.log("View Products for Sale")
            viewProducts(); 
            break;

        case "View Low Inventory":
            console.log("View Low Inventory")
            inventory(); 
            break;

        case "Add to Inventory":
            console.log("Add to Inventory");
            break;

        case "Add New Product":
            console.log("Add New Product");
            break;
    }
}); 
}
function viewProducts () {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products"
    connection.query(query, function(error, response, fields){
        for (var i = 0; i < response.length; i++){
            console.log(response[i].item_id + "  "+ response[i].product_name, + "  " + response[i].price +"  "+  response[i].stock_quantity)
        }
    })
}
function inventory () {
    var query = "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 30"
    connection.query(query, function(error, response, fields){
        for (var i = 0; i < response.length; i++){
            console.log(response[i].product_name + " || Stock quantity: " + response[i].stock_quantity);
        }
    })
}
function addInventory () {

}
function addProduct() {

}
