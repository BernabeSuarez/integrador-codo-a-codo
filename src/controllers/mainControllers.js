const path = require('path');
const getProducts = require('../services/productsService');
const getLicences = require('../services/licencesService');

const mainControllers = {
    home: async (req, res) => {
        const products = await getProducts.getProducts();
        const licences = await getLicences.getLicences();
        console.log(req.session);
        res.render(path.resolve(__dirname, '../views/home'), { products: products, licences: licences, user: req.session });
    }, contact: (req, res) => res.render(path.resolve(__dirname, '../views/infoView'), { title: 'Contáctanos', message: 'Comunicate con nosotros mandando un mail a contacto@funkostore.com', user: req.session }),
    about: (req, res) => res.send('Route for About view'),
    faqs: (req, res) => res.send('Route for FAQs view')
}

module.exports = mainControllers;