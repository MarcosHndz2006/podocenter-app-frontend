// routes/item.routes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Routes for /api/items
// router.get('/clasification/:classificationId', itemController.getItemsByClasification);
// router.get('/expiry/near', itemController.getItemsNearingExpiry);
router.get('/farmacehouses/all', itemController.getAllFarmacehouses)
router.get('/clasifications/all/', itemController.getAllProductClasifications);
router.get('/units/all', itemController.getAllUnits);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/update', itemController.editItem);
router.post('/', itemController.createItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;