// routes/item.routes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Routes for /api/items
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);
router.get('/classification/:classificationId', itemController.getItemsByClassification);
router.get('/expiry/near', itemController.getItemsNearingExpiry);

module.exports = router;