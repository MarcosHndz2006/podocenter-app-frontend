const express = require('express');
const router = express.Router();
const spacesController = require('../controllers/spaces.controller');

// Create a new space
router.post('/', spacesController.createSpace);

// Get all spaces
router.get('/', spacesController.getAllSpaces);

// Update a space by ID
router.put('/update', spacesController.updateSpace);

// Get a space by ID
router.get('/:idSpaces', spacesController.getSpaceById);

// Delete a space by ID
router.delete('/:idSpaces', spacesController.deleteSpace);

module.exports = router;