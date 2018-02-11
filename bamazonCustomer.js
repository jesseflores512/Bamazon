var mysql   = require('mysql');
var bodyParser = require("body-parser");
var inquirer = require("inquirer");
var cTable = require("console.table");


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
  loadProducts()
});

//load product table from db
function loadProducts () {
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;
    console.log("Welcome to Bamazon!\n")
    console.table(res)

    promptCustomerForItem();
  });
}

// get id from customer
function promptCustomerForItem() {
 inquirer.prompt([{
   type:'input',
   name:'idChoice',
   message:'What is the item ID of the product you would like to purchase?'
 },
  {
    type:'input',
    name:'quantityChoice',
    message:'How many would you like to purchase?'
  }]).then(function(input){

    var productId = input.idChoice;
    var quantity = input.quantityChoice;

    connection.query("SELECT * FROM products WHERE ?", {item_id: productId}, function(err, res){
        if (err) throw err;

        productData = res[0];
        //determine if enough items are in stock
        if (productData.stock_quantity < quantity) {
          console.log("Sorry not enough product in stock.");
          promptCustomerForItem();
        }
        else {
          var updateQuantity = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + productId;

          connection.query(updateQuantity, function(err, res) {
            if (err) throw err;

            console.log('Order placed! Your total is $' + productData.price * quantity);
            console.log('Thank you for your purchase.');

            connection.end();
          })

        }
      })
    });
  };
