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
  console.log("connected as id " + connection.threadId + "\n");
});

menu();

function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What do you want to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      if (answer.options === "View Products for Sale") {
        viewProduct();
      } else if (answer.options === "View Low Inventory") {
        lowInventory();
      } else if (answer.options === "Add to Inventory") {
        addInventory();
      } else if (answer.options === "Add New Product") {
        newInventory();
      } else if (answer.options === "Exit") {
        connection.end();
      } else {
        console.log("Choose something!");
      }
    });
}

function viewProduct() {
  connection.query("SELECT * FROM Products", function(err, results) {
    if (err) throw err;
    // console.log(results);

    let table = new Table({
      head: ["ID", "Product Name", "Dapartment", "Price", "Quantity"],
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
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());

    menu();
  });
}

function lowInventory() {
  connection.query("SELECT * FROM Products where stock_quantity < 5", function(
    err,
    results
  ) {
    if (err) throw err;
    // console.log(results);

    let table = new Table({
      head: ["ID", "Product Name", "Dapartment", "Price", "Quantity"],
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
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());

    menu();
  });
}

function addInventory() {
  connection.query("SELECT * FROM Products", function(err, res) {
    if (err) {
      console.log(err);
    }
    var productArr = [];
    for (var i = 0; i < res.length; i++) {
      productArr.push(res[i].product_name);
    }

    inquirer
      .prompt([
        {
          name: "inventory",
          type: "list",
          choices: productArr,
          message: "Choose an item you want to add more inventory to?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many quantity are you adding?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            } else {
              return false;
            }
          }
        }
      ])
      .then(function(answer) {
        var currentqty;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.inventory) {
            currentqty = res[i].stock_quantity;
          }
        }
        console.log("Updating product low inventory...");
        var query = connection.query(
          "UPDATE Products SET ? WHERE ?",
          [
            { stock_quantity: currentqty + parseInt(answer.quantity) },
            { product_name: answer.inventory }
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
          }
        );
        console.log(query.sql);
        menu();
      });
  });
}

function newInventory() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product name?"
      },
      {
        name: "dept_name",
        type: "input",
        message: "What is the product department?"
      },
      {
        name: "product_price",
        type: "input",
        message: "What is the price of the product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "product_qty",
        type: "input",
        message: "What is the quantity of the product?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      console.log("Inserting a new product.... \n");
      var query = connection.query(
        "INSERT INTO Products SET ?",
        {
          product_name: answer.product,
          department_name: answer.dept_name,
          price: answer.product_price,
          stock_quantity: answer.product_qty
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
        }
      );
      console.log(query.sql);
      menu();
    });
}
