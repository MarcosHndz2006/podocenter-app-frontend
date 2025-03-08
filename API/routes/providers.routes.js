// routes/providers.routes.js
const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providers.controller');

// Routes for /api/providers
router.get('/', providersController.getAllProviders);
router.get('/:id', providersController.getProviderById);
router.post('/', providersController.createProvider);
router.put('/:id', providersController.updateProvider);
router.delete('/:id', providersController.deleteProvider);

module.exports = router;