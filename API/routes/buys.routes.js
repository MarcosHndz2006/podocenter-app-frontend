// routes/buys.routes.js
const express = require('express');
const router = express.Router();
const buysController = require('../controllers/buys.controller');

// Routes for /api/buys
router.get('/', buysController.getAllBuys); 'http://localhost:3000/api/buys/'
router.get('/:id', buysController.getBuyById); 'http://localhost:3000/api/buys/1'
router.post('/', buysController.createBuy);
router.put('/:id', buysController.updateBuy);
router.delete('/:id', buysController.deleteBuy);
router.get('/provider/:providerId', buysController.getBuysByProviderId); 'http://localhost:3000/api/buys/provider/2'


module.exports = router;