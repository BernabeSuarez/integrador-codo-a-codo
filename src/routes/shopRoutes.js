const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopControllers');

router.get('/', (req, res) => shopControllers.shop);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.itemAdd);
router.get('/cart', shopControllers.cartGet);
router.post('/cart', shopControllers.cartPost);

module.exports = router;