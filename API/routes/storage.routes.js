const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storage.controller');

// Create a new storage entry
router.post('/storage', storageController.createStorage);
router.get('/storage', storageController.getAllStorage);

// Get a storage entry by ID
router.get('/storage/:idStorage', storageController.getStorage);

// Update a storage entry by ID
router.put('/storage/:idStorage', storageController.updateStorage);

// Delete a storage entry by ID
router.delete('/storage/:idStorage', storageController.deleteStorage);

module.exports = router;