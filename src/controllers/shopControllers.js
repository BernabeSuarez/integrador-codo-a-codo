const path = require('path');
const productsDB = require('../services/productsService');
const licencesDB = require('../services/licencesService');

const shopControllers = {
        shop: async (req, res) => {
                const products = await productsDB.getProducts({ product_name: req.query.search, order: req.query.order, min: req.query.min, max: req.query.max });
                const licences = await licencesDB.getLicences();
                res.render(path.resolve(__dirname, '../views/shop'), { products: products, licences: licences, user: req.session });
        }, item: async (req, res) => {
                const product = await productsDB.getCertainProduct(req.params.id);
                const products = await productsDB.getRelatedProducts(product.product_id, product.licence_id);
                const licences = await licencesDB.getSameLicenceProducts(product.licence_id);
                res.render(path.resolve(__dirname, '../views/item'), { item: product, products: products, licences: licences, user: req.session });
        }, itemAdd: (req, res) => {
                if (!(req.session.cart))
                        req.session.cart = [];
                for (let i = 0; i < req.session.cart.length; i++){
                        if (req.session.cart[i].product_id == req.body.product_id) {
                                req.session.cart[i].quantity += 1;
                                return res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Ya tenías ese producto en el carrito, se agregaron las unidades correspondientes.', user: req.session });
                        }
                }
                req.session.cart.push(req.body);
                req.session.cart[req.session.cart.length-1].quantity = Number(req.session.cart[req.session.cart.length-1].quantity);
                req.session.cart[req.session.cart.length-1].product_id = Number(req.session.cart[req.session.cart.length-1].product_id);
                res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Se agregó el producto al carrito satisfactoriamente.', user: req.session });
        },
        cartGet: async (req, res) => {
                let products = [];
                let total = {'price': 0, 'quantity': 0};
                if (req.session.cart){
                        for (let i = 0; i < req.session.cart.length; i++){
                                products.push(await productsDB.getCertainProduct(req.session.cart[i].product_id));
                                products[i].quantity = req.session.cart[i].quantity;
                                products[i].licence = await licencesDB.getCertainLicence(req.session.cart[i].product_id);
                                total.price += products[i].price * products[i].quantity;
                                total.quantity += products[i].quantity;
                        }
                }
                res.render(path.resolve(__dirname, '../views/cart'), { products: products, total: total, user: req.session });
        },
        cartPost: (req, res) => {
                let products = [];
                let total = {'price': 0, 'quantity': 0};
                if (req.session.cart){
                        for (let i = 0; i < req.session.cart.length; i++) {
                                if (req.body.product_id == req.session.cart[i].product_id)
                                        req.session.cart.splice(i, 1);
                        }
                        if(req.session.cart.length == 0)
                                delete req.session.cart;
                }
                if (req.session.name && req.session.cart)
                        return res.render(path.resolve(__dirname, '../views/info'), { title: 'Métodos de pago', message: 'Elegí tu forma de pago', products: products, total: total, user: req.session });
                else if (!req.session.name)
                        return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'Debes loguearte antes de realizar una compra.', products: products, total: total, user: req.session });
                else if (!req.session.cart)
                        return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No agregaste ningún producto al carrito.', products: products, total: total, user: req.session });
        }
}

module.exports = shopControllers;