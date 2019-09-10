require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.database_password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

inventory();

function inventory() {
  connection.query("SELECT * FROM Products", function(err, results) {
    if (err) throw err;
    // console.log(results);

    let table = new Table({
      head: ["ID", "Product Name", "Dapartment", "Price"],
      style: {
        head: ["cyan"],
        compact: false,
        colAligns: ["center"]
      }
    });

    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price
      ]);
    }
    console.log(table.toString());
    console.log(
      "_______________________________________________________________________________________________________"
    );

    userPurchase();
  });
}

function userPurchase() {
  inquirer
    .prompt([
      {
        name: "product_item",
        type: "input",
        message: "What is the ID of the product they would like to buy?"
        // validate: function(value) {
        //   if (
        //     isNaN(value) === false &&
        //     parseInt(value) <= results.length &&
        //     parseInt(value) > 0
        //   ) {
        //     return true;
        //   } else {
        //     return "Please enter a valid number";
        //   }
        // }
      },
      {
        name: "product_qty",
        type: "input",
        message: "How many units of the product you will like to purchase?",
        validate: function(value) {
          if (isNaN(value)) {
            return "Please enter a quantity";
          } else {
            return true;
          }
        }
      }
    ])
    .then(function(answer) {
      var item = answer.product_item;
      var qty = parseInt(answer.product_qty);

      var productQuery = "SELECT * FROM Products WHERE ? ";

      connection.query(productQuery, { item_id: item }, function(err, res) {
        if (err) throw err;

        // console.log(res);

        if (res.length === 0) {
          console.log("Please enter a valid Product ID");
        } else {
          var productInventory = res[0];
          if (qty <= productInventory.stock_quantity) {
            console.log("The product is in stock");

            var updateQuery =
              "UPDATE products SET stock_quantity = " +
              (parseInt(productInventory.stock_quantity) - parseInt(qty)) +
              " WHERE item_id = " +
              item;

            connection.query(updateQuery, function(err, res) {
              if (err) throw err;

              console.log("Your product(s) has been placed!!!");
              console.log("Your total is $ " + productInventory.price * qty);
              bamazon();

              //   connection.end();
            });
          } else {
            if (qty > productInventory.stock_quantity) {
              console.log("Insuffiencient quantity!!!");
              bamazon();
            }
          }
        }
      });
    });
}

function bamazon() {
  inquirer
    .prompt({
      type: "list",
      name: "reBuy",
      message: "Do you want to make another purchase?",
      choices: ["Yes", "No"]
    })
    .then(function(ans) {
      if (ans.reBuy === "Yes") {
        inventory();
      } else {
        console.log("Thanks for shopping with us!!!");
      }
    });
}
