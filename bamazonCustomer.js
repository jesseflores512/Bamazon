var mysql   = require('mysql');
var bodyParser = require("body-parser");
var inquirer = require("inquirer");
var cTable = require("console.table");
var port = 3000;


//creat connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port: 8889
});

//connect callback function
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

});

//load product table from db
function loadProducts () {
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;
    console.log("\n")
    console.table(res)
  })

}

// get id from customer
function promptCustomerForItem(inventory) {
 inquirer.prompt([{
   type:'input',
   name:'choice',
   message:'What is the product ID of the item you would like to purchase?'
 }]).then(function(val){
   checkIfValueExist(val.quantity)
   var choiceId = parseInt(val.choice);

   if (product){
      // call quantity
      promptCustomerForQuantity(product)
   } else {
//if not enough product show insuffient message
      console.log("\n insuffient product inventory")
      loadProducts()
   }

    })
  };
  loadProducts()

  promptCustomerForItem()


//prompt customer for quantity
  // function promptCustomerForQuantity(product) {
  //
  //  inquirer.prompt([{
  //    type:'input',
  //    name:'choice',
  //    message:'What is the quantity of the item you would like to purchase? [Quit with Q]'
  //    validate: function(val){
  //      return val>0 || val.toLowerCase() == "q"
  //    }
  //  }]).then(function(val){
  //
  //    var choiceId = parseInt(val.choice);
  //
  //    if (product){
  //
  //    } else {
  //
  //       console.log("\n insuffient product inventory")
  //       loadProducts()
  //    }
  //
  //     })
  //   };


//check id quantity

//if enough product update database

//show customer the total cost of purchase
