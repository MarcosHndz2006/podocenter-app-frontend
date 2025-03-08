// routes/divisions.routes.js
const express = require('express');
const router = express.Router();
const divisionsController = require('../controllers/divisions.controller');

// Routes for /api/divisions
router.get('/', divisionsController.getAllDivisions);
router.get('/:id', divisionsController.getDivisionById);
router.post('/', divisionsController.createDivision);
router.put('/:id', divisionsController.updateDivision);
router.delete('/:id', divisionsController.deleteDivision);
router.get('/shelf/:shelfId', divisionsController.getDivisionsByShelfId);
router.get('/item/:itemId', divisionsController.getDivisionsByItemId);

module.exports = router;