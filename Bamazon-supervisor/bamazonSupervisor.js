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
    start ()
    //console.log("connected as id " + connection.threadId);
});

function start () {
    inquirer.prompt([
        {
          type: "list", 
          message: "What would you like to do?",
          choices: ["View Products sales by Department", "Create new department", "Exit app"], 
          name: "command"  
        }
    ]).then(function (command){
        switch (command.command) {
            case "View Products sales by Department":
                salesByDpt();
                break;
    
            case "Create new department":
                newDpt();
                break;
            case "Exit app":
                exitApp();
                break;
        }
    }); 
}

function salesByDpt() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS Product_sales, SUM(products.product_sales) -departments.over_head_costs AS total_profit FROM products LEFT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_id, departments.department_name, departments.over_head_costs"
    connection.query(query,function (error, results, fields){
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].Product_sales,results[i].total_profit ); 
        } 
    })

}

function newDpt() {
    inquirer.prompt([
        {
            type: "input", 
            message: "Whats the name of the Department you would like to add?", 
            name: "deptName"
        }, 
        {
            type: "input", 
            message: "Whats the overhaead cost for this department?", 
            name: "overHead"
        },
    ]).then(function(newDept){
        var query = "INSERT INTO departments SET ?"
        connection.query(query, 
        {
            department_name: newDept.deptName,
            over_head_costs: newDept.overHead
        })
        console.log("-----------------------------------")
        console.log(newDept.deptName + "  Has been added to your DB")
        console.log("-----------------------------------")
        connection.end()
    })

}

function exitApp () {
    connection.end()
}