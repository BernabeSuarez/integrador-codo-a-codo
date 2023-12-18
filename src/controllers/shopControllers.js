const path = require('path');
const getProducts = require('../services/productsService');
const getLicences = require('../services/licencesService');

const shopControllers = {
        shop: async (req, res) => {
                const products = await getProducts.getProducts(req.query.search, req.query.order, req.query.min, req.query.max);
                const licences = await getLicences.getLicences();
                res.render(path.resolve(__dirname, '../views/shop'), { products: products, licences: licences });
        }, item: async (req, res) => {
                let item = await getProducts.getCertainProduct(req.params.id);
                item = item[0];
                const products = await getProducts.getRelatedProducts(item.product_id, item.licence_id);
                const licences = await getLicences.getSameLicenceProducts(item.licence_id);
                res.render(path.resolve(__dirname, '../views/item'), { item: item, products: products, licences: licences });
        }, itemAdd: (req, res) => res.send(`Route for add the item with the ID ${req.params.id} to the shop cart`),
        cartGet: (req, res) => res.send('Route for the cart view'),
        cartPost: (req, res) => res.send('Route for checkout page')
}

module.exports = shopControllers;