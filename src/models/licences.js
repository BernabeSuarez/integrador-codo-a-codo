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

module.exports = { 
    getLicences, getSameLicenceProducts
};