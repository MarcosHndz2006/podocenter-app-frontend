const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storage.controller');

// Create a new storage entry
router.post('/', storageController.createStorage);
router.get('/', storageController.getAllStorage);

router.get('/shelfs', storageController.getAllStorageWithShelfs)

// Get a storage entry by ID
router.get('/:idStorage', storageController.getStorage);

// Update a storage entry by ID
router.put('/:idStorage', storageController.updateStorage);

// Delete a storage entry by ID
router.delete('/:idStorage', storageController.deleteStorage);

module.exports = router;