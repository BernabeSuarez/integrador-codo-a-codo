const path = require('path');
const usersDB = require('../services/usersService');
const dotenv = require('dotenv');
dotenv.config()

const authControllers = {
    loginGet: (req, res) => {
        if (req.session.name)
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'Ya estás logueado.', user: req.session });
        else
            return res.render(path.resolve(__dirname, '../views/login'), { user: req.session });
    },
    loginPost: async (req, res) => {
        const users = await usersDB.getUsers();
        for (let i = 0; i < users.length; i++) {
            if (req.body.email == users[i].email && req.body.password == users[i].password) {
                req.session.name = users[i].name;
                if (req.session.name === process.env.USERADMIN)
                    req.session.isAdmin = true;
                else
                    req.session.isAdmin = false;
                return res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Te has logueado satisfactoriamente.', user: req.session });
                break;
            }
        }
        console.log(req.session);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'El usuario o el email ingresados son incorrectos.', user: req.session });
    },
    registerGet: (req, res) => {
        if (req.session.name)
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'Ya estás logueado en una cuenta.', user: req.session });
        else
            return res.render(path.resolve(__dirname, '../views/register'), { user: req.session })
    },
    registerPost: async (req, res) => {
        const users = await usersDB.getUsers();
        let responseMessage = { title: '', message: '' };
        for (let i = 0; i < users.length; i++) {
            if (req.body.email == users[i].email) {
                return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'El email que estás intentando utilizar ya pertenece a un usuario.', user: req.session });
                break;
            }
        }
        if (req.body.password != req.body.repeat_password){
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'Las contraseñas no coinciden.', user: req.session });
        } 
        usersDB.addUser(req.body.name, req.body.lastname, req.body.email, req.body.password);
        res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Te has registrado exitosamente.', user: req.session });
    },
    logout: (req, res) => {
        if (req.session.name) {
            delete req.session.name;
            delete req.session.isAdmin;
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Éxito', message: 'Te has deslogueado satisfactoriamente.', user: req.session });
        } else
            return res.render(path.resolve(__dirname, '../views/info'), { title: 'Error', message: 'No has iniciado sesión.', user: req.session });
    }
}

module.exports = authControllers;