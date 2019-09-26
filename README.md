# BAMAZON - An Amazon-like storefront CLI App with _Nodejs_ and _MySQL_

## Overview

> The app will take in orders from customers and deplete stock from the store's inventory. It also tracks product sales across department.

## Technologies Used

    * MySQL
    * NodeJS
    * Node Package Manager
        * Inquirer
        * MySQL
        * CLI-Table
        * dotenv

## Customer View

### Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. The app will prompt users with two messages.

    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.

> Once the customer has placed the order, the application will check if bamazon has enough of the product to meet the customer's request. If not, the app will log "Insuficient quantity!", and then prevent the order from going through.
> if your store does have enough of the product, it will fulfill the customer's order.

    * This means updating the SQL database to reflect the remaining quantity.
    * Once the update goes through, show the customer the total cost of their purchase.

### Run customer's view with

`<node bamazonCustomer.js>`

![customer-view screenshot](/img/customerView.png)

## Manager View

### Running this application will list a set of menu options:

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

> If the manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.
> ![product-sales](/img/product-sales.png)

> If the manager selects `View Low Inventory`, the app will list all items with an inventory count lower than five.
> ![low-inventory](/img/low-inventory.png)

> If the manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.
> ![update-inventory](/img/updatingInventory.png)

> If the manager selects `Add New Product`, the app will allow the manager to add a completely new product to the store.
> ![update-inventory](/img/updatingInventory.png)

### Run manager's view with

`<node bamazonManager.js>`
