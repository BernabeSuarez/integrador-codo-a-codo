const categories = require('../models/categories');

const getCategories = async () => {
    return categories.getCategories();
};

const getCertainCategory = async (product_id) => {
    return categories.getCertainCategory(product_id);
};

module.exports = {
    getCategories, getCertainCategory
}