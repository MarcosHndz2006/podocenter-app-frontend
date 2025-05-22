const express = require('express');
const router = express.Router();
const spacesController = require('../controllers/spaces.controller');

// Update a space by ID
router.put('/update', spacesController.updateSpace);

// Update info of space
router.post('/updateSpace/:id', spacesController.updateInfoSpace)

// Get all space states
router.get('/spaceStates', spacesController.getSpaceStates )

// Create a new space
router.post('/', spacesController.createSpace);

// Get a space by ID
router.get('/:idSpaces', spacesController.getSpaceById);

// Get all spaces
router.get('/', spacesController.getAllSpaces);

// Delete a space by ID
router.delete('/:idSpaces', spacesController.deleteSpace);



module.exports = router;