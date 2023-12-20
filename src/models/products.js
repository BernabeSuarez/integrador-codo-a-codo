const { conn } = require('../config/conn');

const getProducts = async (params) => {
    let query = 'SELECT * FROM product';
    console.log(params);
    if (params) {
        if (params.product_name || params.min || params.max || params.sku) query += ' WHERE';
        if (params.product_name) query += ` product_name LIKE '%${params.product_name}%'`;
        if ((params.product_name && params.min) || (params.product_name && params.max)) query += ' AND';
        if (params.min) query += ` price >= ${params.min}`;
        if (params.min && params.max) query += ' AND';
        if (params.max) query += ` price <= ${params.max}`;
        if (params.sku) query += ` sku LIKE '%${params.sku}%'`
        if (params.order) query += ` ORDER BY product_name ${params.order}`;
    }
    try {
        const [rows] = await conn.query(query + ';');
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

const editProduct = async (params) => {
    let query = `UPDATE product SET product_name = '${params.product_name}', product_description = '${params.product_description}'`;
    query += `, licence_id = ${params.licence}, category_id = ${params.category}, sku = '${params.sku}', price = ${params.price}`;
    query += `, stock = ${params.stock}, image_front = '${params.image_front}', image_back = '${params.image_back}'`;
    query += ` WHERE product_id = ${params.product_id};`;
    try {
        const [rows] = await conn.query(query);
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const addProduct = async (params) => {
    let query = 'INSERT INTO product (product_name, product_description, price, stock, sku, image_front, image_back, licence_id, category_id)';
    query += `VALUES ('${params.product_name}', '${params.product_description}', '${params.price}', '${params.stock}', '${params.sku}'`;
    query += `, '${params.image_front}', '${params.image_back}', '${params.licence}', '${params.category}');`
    try {
        const [rows] = await conn.query(query);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = {
    getProducts, getCertainProduct, getRelatedProducts, editProduct, addProduct
};