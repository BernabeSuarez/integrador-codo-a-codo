const path = require('path');
const productsDB = require('../services/productsService');
const licencesDB = require('../services/licencesService');
const categoriesDB = require('../services/categoriesService');

const multer = require('multer');
const e = require('express');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

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
        const imageFront = req.files['image-front-uploaded'][0];
        const imageBack = req.files['image-back-uploaded'][0];
        if (imageFront){
            req.body.image_front = `${imageFront.destination}/${imageFront.filename}`.replace('public','');
        }
        if (imageBack) {
            req.body.image_back = `${imageBack.destination}/${imageBack.filename}`.replace('public','');
        }
        productsDB.addProduct(req.body);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Se creó el producto exitosamente.', user: req.session });
    },
    editGet: async (req, res) => {
        if (req.session.isAdmin) {
            const product = await productsDB.getCertainProduct(req.params.id);
            return res.render(path.resolve(__dirname, '../views/product'), { title: 'Editar Producto', action: ('/admin/edit/' + product.product_id + '?_method=PUT'), product: product, user: req.session });
        } else
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No estás logueado como admin.', user: req.session });
    },
    editPut: (req, res) => {
        const imageFront = req.files['image-front-uploaded'];
        const imageBack = req.files['image-back-uploaded'];
        if (imageFront){
            req.body.image_front = `${imageFront[0].destination}/${imageFront[0].filename}`.replace('public','');
        }
        if (imageBack) {
            req.body.image_back = `${imageBack[0].destination}/${imageBack[0].filename}`.replace('public','');
        }
        productsDB.editProduct(req.body);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Se editó el producto exitosamente.', user: req.session });
    },
    delete: (req, res) => {
        productsDB.deleteProduct(req.body.product_id);
    },
    upload: upload.fields([
        {name: 'image-front-uploaded', maxCount: 1},
        {name: 'image-back-uploaded', maxCount: 1}
    ])
}

module.exports = adminControllers;