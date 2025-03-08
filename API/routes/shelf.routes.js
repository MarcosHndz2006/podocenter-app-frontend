// routes/shelf.routes.js
const express = require('express');
const router = express.Router();
const shelfController = require('../controllers/shelf.controller');

// Routes for /api/shelves
router.get('/', shelfController.getAllShelves);
router.get('/:id', shelfController.getShelfById);
router.post('/', shelfController.createShelf);
router.put('/:id', shelfController.updateShelf);
router.delete('/:id', shelfController.deleteShelf);
router.get('/storage/:storageId', shelfController.getShelvesByStorageId);
router.get('/available/list', shelfController.getAvailableShelves);

module.exports = router;