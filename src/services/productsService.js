const products = require('../models/products');

const getProducts = async (search, order, min, max) => {
    return products.getProducts(search, order, min, max);
}

const getCertainProduct = async (product_id) => {
    return products.getCertainProduct(product_id);
};

const getRelatedProducts = async (product_id, licence_id) => {
    return products.getRelatedProducts(product_id, licence_id);
};

module.exports = {
    getProducts, getCertainProduct, getRelatedProducts
}