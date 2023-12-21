const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const methodOverride = require('method-override');

const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'funko',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));