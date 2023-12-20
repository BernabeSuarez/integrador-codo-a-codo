const products = require('../models/products');

const getProducts = async (params) => {
    return products.getProducts(params);
}

const getCertainProduct = async (product_id) => {
    return products.getCertainProduct(product_id);
};

const getRelatedProducts = async (product_id, licence_id) => {
    return products.getRelatedProducts(product_id, licence_id);
};

const editProduct = async(params) => {
    products.editProduct(params);
}

const addProduct = async(params) => {
    products.addProduct(params);
}

module.exports = {
    getProducts, getCertainProduct, getRelatedProducts, editProduct, addProduct
}