const express = require('express');
const router = express.Router();
const spacesController = require('../controllers/spaces.controller');

// Create a new space
router.post('/spaces', spacesController.createSpace);

// Get all spaces
router.get('/spaces', spacesController.getAllSpaces);

// Get a space by ID
router.get('/spaces/:idSpaces', spacesController.getSpaceById);

// Update a space by ID
router.put('/spaces/:idSpaces', spacesController.updateSpace);

// Delete a space by ID
router.delete('/spaces/:idSpaces', spacesController.deleteSpace);

module.exports = router;