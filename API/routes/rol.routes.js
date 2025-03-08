// routes/rol.routes.js
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');

// Routes for /api/roles
router.get('/', rolController.getAllRoles);
router.get('/:id', rolController.getRoleById);
router.post('/', rolController.createRole);
router.put('/:id', rolController.updateRole);
router.delete('/:id', rolController.deleteRole);
router.get('/service-unit/:serviceUnit', rolController.getRolesByServiceUnit);

module.exports = router;