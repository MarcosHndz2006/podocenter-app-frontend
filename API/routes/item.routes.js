// routes/item.routes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Routes for /api/items
router.get('/clasification/all/', itemController.getAllProductClasifications);
router.get('/clasification/:classificationId', itemController.getItemsByClassification);
router.get('/expiry/near', itemController.getItemsNearingExpiry);
router.get('/units', itemController.getAllProductoUnits)
router.get('/farmacehouses', itemController.getAllProductFarmacehouses)
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;