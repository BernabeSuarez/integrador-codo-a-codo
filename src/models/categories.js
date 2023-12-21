const { conn } = require('../config/conn');

const getCategories = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM category;');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getCertainCategory = async (product_id) => {
    try {
        const [rows] = await conn.query(`SELECT category.* FROM category JOIN product ON category.category_id = product.category_id WHERE product.product_id = ${product_id};`);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = { 
    getCategories, getCertainCategory
};