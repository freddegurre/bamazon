# bamazon
###### This is a node.js application simulating a small supermarket, Using a MySql DB. 

The application has 3 user roles. 
* Customer
* Manager
* Supervisor

### Customer
The customer can se all products & prices currently for sale in the supermarket. They can shop any product and decide how many they would like of that product, Given that there is enough in stock. Once they have decided product and quantity they will get a total price. 

### Manager
The manager is able to se all products and current inventory, se what products are low on inventory and add more inventory to any product. And create new products for sale.

### Supervisor
The supervsor is able to see sales and profit by department, also adding new departments. 

Here is a [video demo!](https://drive.google.com/file/d/1i_CCz9O_iah5V8ZjSEA-X8xrK2CfdUur/view?usp=sharing) of application running. 

### DB
The database is a simple MySql with two tables. **Products** **departments**

### Code
Customer, Manager and Supervisor are separated files. All files start with a switch case that askse the user questions, depending on the answer different functions are called. **Example Below**

```javascript
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
```









