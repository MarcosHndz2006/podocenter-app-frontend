// routes/buys.routes.js
const express = require('express');
const router = express.Router();
const buysController = require('../controllers/buys.controller');

// Routes for /api/buys
router.get('/', buysController.getAllBuys);
router.get('/:id', buysController.getBuyById);
router.post('/', buysController.createBuy);
router.put('/:id', buysController.updateBuy);
router.delete('/:id', buysController.deleteBuy);
router.get('/provider/:providerId', buysController.getBuysByProviderId);

module.exports = router;