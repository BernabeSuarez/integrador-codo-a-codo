const path = require('path');
const productsDB = require('../services/productsService');
const licencesDB = require('../services/licencesService');

const mainControllers = {
    home: async (req, res) => {
        const products = await productsDB.getProducts();
        const licences = await licencesDB.getLicences();
        console.log(req.session);
        res.render(path.resolve(__dirname, '../views/home'), { products: products, licences: licences, user: req.session });
    }, contact: (req, res) => res.render(path.resolve(__dirname, '../views/info'), { title: 'Contactanos', message: 'Comunicate con nosotros mandando un mail a contacto@funkostore.com', user: req.session }),
    about: (req, res) => res.send('Route for About view'),
    faqs: (req, res) => res.send('Route for FAQs view')
}

module.exports = mainControllers;