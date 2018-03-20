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
//Start application
function start () {
    inquirer.prompt([
        {
        type: "list", 
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product", "Exit app"], 
        name: "command"  
        }
    ]).then(function (command){
        switch (command.command) {
            case "View Products for Sale":
                viewProducts(); 
                
                break;

            case "View Low Inventory":
                inventory(); 
                break;

            case "Add to Inventory":
                addInventory(addInventoryTwo); 
                break;

            case "Add New Product":
                addProduct(); 
                break;
            
            case "Exit app":
                exitApp(); 
                break;
        }
    }); 
}
// View all products in all departments
function viewProducts () {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products"
    connection.query(query, function(error, response, fields){
        for (var i = 0; i < response.length; i++){
            console.log("ID: " + response[i].item_id + "  " + response[i].product_name + " |Price: " + response[i].price + " |Inventory:  " +  response[i].stock_quantity)
        }
        start ()
    })
    
}
//Check inventory of all products where its less than 10,
function inventory () {
    var query = "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 10"
    connection.query(query, function(error, response, fields){
        for (var i = 0; i < response.length; i++){
            console.log(response[i].product_name + " || Inventory: " + response[i].stock_quantity);
        }
        start ()
    })
}

//Add inventory for exsisting product
var prod =[];
function addInventory (cb) {
   var query = "SELECT item_id, product_name, stock_quantity FROM products"
   connection.query(query, function (error, response, fields){
       console.log("------------CURRENT INVENTORY-------------");
       for (var i = 0; i < response.length; i++) {
            prod.push(JSON.stringify(response[i].item_id));
            console.log("ID: " + response[i].item_id + " || " + response[i].product_name + " Inventory: " + response[i].stock_quantity);
        }
      cb(); 
   }) 
   
}
//Add inventory for exsisting product
function addInventoryTwo() {
   inquirer.prompt([
   {
        type: "list",
        message: "What ID would you like to update the inventory for?",
        choices: prod,
        name: "prodID"  
   }, 
   {
        type:"input",
        message: "How much would you like to add?",
        name: "newInv"
   }
   ]).then(function(input){
        connection.query('SELECT * FROM products WHERE ?',
        {
            item_id: input.prodID
        },
        function (error, results, fields){
            
            var updInv = Number(results[0].stock_quantity) + Number(input.newInv); 
            var query = "UPDATE products SET ? WHERE ?"
            connection.query(query, [{ stock_quantity: updInv}, { item_id: input.prodID }])
            console.log("-----------------------------------")
            console.log(input.newInv + " : inventory added to: " + results[0].product_name)
            console.log("-----------------------------------")
            start ()
        })
    
    })
}
     
//Creata new product in DB        
function addProduct() {

    inquirer.prompt([
        {
            type:"input",
            message: "What product is it?",
            name: "product"
        }, 
        {
            type:"input", 
            message: "What is the price?",
            name: "price"
        },
        {
            type:"input", 
            message: "how much invetory should be added for this product?",
            name: "inventory"
        },
        {
            type:"input", 
            message: "what department does the product belong to?",
            name: "department"
        }
    ]).then(function(newProd){
        var query = "INSERT INTO products SET ?"
        connection.query(query,
            {
                product_name: newProd.product,
                price: newProd.price,
                stock_quantity: newProd.inventory,
                department_name: newProd.department
                
            }
        )
        console.log("-----------------------------------")
        console.log(newProd.product + "  Has been added to your shop")
        console.log("-----------------------------------")
    start ()
    })
    
   
}
//Exit app
function exitApp () {
    connection.end()
}