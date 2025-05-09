// routes/service.routes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

router.get('/clasifications', serviceController.getServiceClasifications)
router.get('/subclasifications', serviceController.getServiceSubclasifications)
// Routes for /api/services
router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.put('/update', serviceController.updateService);
router.get('/:id', serviceController.getServiceById);
router.delete('/:id', serviceController.deleteService);
router.get('/user/:userId', serviceController.getServicesByUserId);
router.get('/space/:spaceId', serviceController.getServicesBySpaceId);
router.get('/state/:state', serviceController.getServicesByState);

module.exports = router;