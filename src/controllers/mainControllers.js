const path = require('path');
const fs = require('fs');

const mainControllers = {
    home: (req, res) => {
        fs.readFile(path.resolve(__dirname, '../products.json'), 'utf8', (err, data) => {
            res.render(path.resolve(__dirname, '../views/home'), { products: JSON.parse(data) });
        });
    }, contact: (req, res) => res.send('Route for Contact view'),
    about: (req, res) => res.send('Route for About view'),
    faqs: (req, res) => res.send('Route for FAQs view')
}

module.exports = mainControllers;