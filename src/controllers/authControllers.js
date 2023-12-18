const path = require('path');

const authControllers = {
    loginGet: (req, res) => res.render(path.resolve(__dirname, '../views/login')),
    loginPost: (req, res) => res.send('Route for authentify'),
    registerGet: (req, res) => res.render(path.resolve(__dirname, '../views/register')),
    registerPost: (req, res) => res.send('Route for apply register'),
    logout: (req, res) => res.send(`Route for logout`)
}

module.exports = authControllers;