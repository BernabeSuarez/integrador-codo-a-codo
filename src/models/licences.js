const { conn } = require('../config/conn');

const getLicences = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM licence;');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getSameLicenceProducts = async (licence_id) => {
    try {
        const [rows] = await conn.query('SELECT * FROM licence WHERE licence_id = ?;', licence_id);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const getCertainLicence = async (product_id) => {
    try {
        const [rows] = await conn.query(`SELECT licence.* FROM licence JOIN product ON licence.licence_id = product.licence_id WHERE product.product_id = ${product_id};`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = { 
    getLicences, getSameLicenceProducts, getCertainLicence
};