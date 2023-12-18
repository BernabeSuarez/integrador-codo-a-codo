const path = require('path');
const getProducts = require('../services/productsService');
const getLicences = require('../services/licencesService');

const mainControllers = {
    home: async (req, res) => {
            const products = await getProducts.getProducts();
            const licences = await getLicences.getLicences();
            res.render(path.resolve(__dirname, '../views/home'), { products: products, licences: licences });
    }, contact: (req, res) => res.send('Route for Contact view'),
    about: (req, res) => res.send('Route for About view'),
    faqs: (req, res) => res.send('Route for FAQs view')
}

module.exports = mainControllers;