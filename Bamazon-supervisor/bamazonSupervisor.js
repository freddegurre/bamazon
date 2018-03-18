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
          choices: ["View Products sales by Department", "Create new department"], 
          name: "command"  
        }
    ]).then(function (command){
        switch (command.command) {
            case "View Products sales by Department":
                salesByDpt()
                break;
    
            case "Create new department":
                newDpt()
                break;
        }
    }); 
}

function salesByDpt() {

}

function newDpt() {

}