const { conn } = require('../config/conn');

const getUsers = async () => {
    try {
        const [rows] = await conn.query('SELECT * FROM user;');
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

const addUser = async (name, lastname, email, password) => {
    try {
        const [rows] = await conn.query('INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)', [name, lastname, email, password]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.releaseConnection();
    }
}

module.exports = { 
    getUsers, addUser
};