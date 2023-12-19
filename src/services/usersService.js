const users = require('../models/users');

const getUsers = async () => {
    return users.getUsers();
};

const addUser = async(name, lastname, email, password) => {
    users.addUser(name, lastname, email, password);
}

module.exports = {
    getUsers, addUser
};