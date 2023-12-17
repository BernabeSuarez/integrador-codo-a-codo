const adminControllers = {
    admin: (req, res) => res.send('Route for Admin view'),
    createGet: (req, res) => res.send('Route for create product page'),
    createPost: (req, res) => res.send('Route for add created product'),
    editGet: (req, res) => res.send(`Route for edit product page with ID ${req.params.id}`),
    editPut: (req, res) => res.send(`Route for apply edited product with ID ${req.params.id}`),
    delete: (req, res) => res.send('Route for delete product')
}

module.exports = adminControllers;