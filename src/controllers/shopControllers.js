const shopControllers = {
    shop: (req, res) => res.send('Route for Shop view'),
    item: (req, res) => res.send(`Route for find and retrieve a product from the ID ${req.params.id}`),
    itemAdd: (req, res) => res.send(`Route for add the item with the ID ${req.params.id} to the shop cart`),
    cartGet: (req, res) => res.send('Route for the cart view'),
    cartPost: (req, res) => res.send('Route for checkout page')
}

module.exports = shopControllers;