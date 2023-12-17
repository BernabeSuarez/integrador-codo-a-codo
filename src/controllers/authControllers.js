const authControllers = {
    loginGet: (req, res) => res.send('Route for login page'),
    loginPost: (req, res) => res.send('Route for authentify'),
    registerGet: (req, res) => res.send('Route for register page'),
    registerPost: (req, res) => res.send('Route for apply register'),
    logout: (req, res) => res.send(`Route for logout`)
}

module.exports = authControllers;