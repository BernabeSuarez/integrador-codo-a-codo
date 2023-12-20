const path = require('path');
const getProducts = require('../services/productsService');
const getLicences = require('../services/licencesService');

const shopControllers = {
        shop: async (req, res) => {/*req.query.search, req.query.order, req.query.min, req.query.max*/
                const products = await getProducts.getProducts({product_name: req.query.search, order: req.query.order, min: req.query.min, max: req.query.max});
                const licences = await getLicences.getLicences();
                res.render(path.resolve(__dirname, '../views/shop'), { products: products, licences: licences, user: req.session });
        }, item: async (req, res) => {
                const product = await getProducts.getCertainProduct(req.params.id);
                const products = await getProducts.getRelatedProducts(product[0].product_id, product[0].licence_id);
                const licences = await getLicences.getSameLicenceProducts(product[0].licence_id);
                res.render(path.resolve(__dirname, '../views/item'), { item: product[0], products: products, licences: licences, user: req.session });
        }, itemAdd: (req, res) => res.send(`Route for add the item with the ID ${req.params.id} to the shop cart`),
        cartGet: (req, res) => res.send('Route for the cart view'),
        cartPost: (req, res) => res.send('Route for checkout page')
}

module.exports = shopControllers;