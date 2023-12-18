const path = require('path');
const fs = require('fs');

const shopControllers = {
    shop: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../products.json'), 'utf8', (err, data) => {
            res.render(path.resolve(__dirname, '../views/shop'), { products: JSON.parse(data) });
        });
    }, item: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../products.json'), 'utf8', (err, data) => {
            res.render(path.resolve(__dirname, '../views/item'), { item: JSON.parse(data)[req.params.id - 1], products: JSON.parse(data)});
        });
    }, itemAdd: (req, res) => res.send(`Route for add the item with the ID ${req.params.id} to the shop cart`),
    cartGet: (req, res) => res.send('Route for the cart view'),
    cartPost: (req, res) => res.send('Route for checkout page')
}

module.exports = shopControllers;