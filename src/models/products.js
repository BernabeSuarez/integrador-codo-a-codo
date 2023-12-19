const { conn } = require('../config/conn');

const getProducts = async (search, order, min, max) => {
    let query = 'SELECT * FROM product';
    if (search || min || max) query += ' WHERE';
    if (search) query += ` product_name LIKE '%${search}%'`;
    if ((search && min) || (search && max)) query += ' AND';
    if (min) query += ` price >= ${min}`;
    if (min && max) query += ' AND';
    if (max) query += ` price <= ${max}`;
    if (order) query += ` ORDER BY product_name ${order}`;
    try {
        const [rows] = await conn.query(query+';');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getCertainProduct = async (product_id) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_id = ?;', (product_id));
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getRelatedProducts = async (product_id, licence_id) => {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE product_id != ? AND licence_id = ?;', [product_id, licence_id]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = {
    getProducts, getCertainProduct, getRelatedProducts
};