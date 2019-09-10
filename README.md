# BAMAZON

## An Amazon-like storefront CLI App with _Nodejs_ and _MySQL_

## Technologies Used

    * MySQL
    * NodeJS
    * Node Package Manager
        * Inquirer
        * MySQL
        * CLI-Table
        * dotenv

## The app will take in orders from customers and deplete stock from the store's inventory. It also tracks product sales across department.

## Customer View

> Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
> The app will prompt users with two messages.

    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.

> Once the customer has placed the order, the application will check if bamazon has enough of the product to meet the customer's request. If not, the app will log "Insuficient quantity!", and then prevent the order from going through.
> if your store does have enough of the product, it will fulfill the customer's order.

    * This means updating the SQL database to reflect the remaining quantity.
    * Once the update goes through, show the customer the total cost of their purchase.

![Alt Text]('img/customerView.png')
