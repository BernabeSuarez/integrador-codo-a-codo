const path = require('path');
const productsDB = require('../services/productsService');
const licencesDB = require('../services/licencesService');
const categoriesDB = require('../services/categoriesService');

const adminControllers = {
    admin: async (req, res) => {
        if (req.session.isAdmin) {
            const products = await productsDB.getProducts({ sku: req.query.search});
            const categories = await categoriesDB.getCategories();
            return res.render(path.resolve(__dirname, '../views/admin'), { products: products, categories: categories, user: req.session });
        } else
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No estás logueado como admin.', user: req.session });
    },
    createGet: (req, res) => {
        if (req.session.isAdmin)
            return res.render(path.resolve(__dirname, '../views/product'), { title: 'Crear Producto', action: '/admin/create', product: {price: 0, stock: 0}, user: req.session })
        else
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No estás logueado como admin.', user: req.session });
    },
    createPost: (req, res) => {
        productsDB.addProduct(req.body);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Se creó el producto exitosamente.', user: req.session });
    },
    editGet: async (req, res) => {
        if (req.session.isAdmin) {
            const product = await productsDB.getCertainProduct(req.params.id);
            /*const licence = await licencesDB.getCertainLicence(req.params.id);
            const category = await categoriesDB.getCertainCategory(req.params.id);
            const categories = await categoriesDB.getCategories();*/
            console.log(product);
            return res.render(path.resolve(__dirname, '../views/product'), { title: 'Editar Producto', action: ('/admin/edit/' + product[0].product_id + '?_method=PUT'), product: product[0], user: req.session });
        } else
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No estás logueado como admin.', user: req.session });
    },
    editPut: async (req, res) => {
        productsDB.editProduct(req.body);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Se editó el producto exitosamente.', user: req.session });
    },
    delete: (req, res) => {
        console.log(req.body);
    }
}

module.exports = adminControllers;