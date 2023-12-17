const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');

router.get('/', adminControllers.admin);
router.get('/create', adminControllers.createGet);
router.post('/create', adminControllers.createPost);
router.get('/edit/:id', adminControllers.editGet);
router.put('/edit/:id', adminControllers.editPut);
router.delete('/delete', adminControllers.delete);

module.exports = router;