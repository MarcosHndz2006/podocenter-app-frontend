// routes/index.js
const express = require('express');
const router = express.Router();

// Import all route files
const buysRoutes = require('./buys.routes');
const divisionsRoutes = require('./divisions.routes');
const itemRoutes = require('./item.routes');
const providersRoutes = require('./providers.routes');
const rolRoutes = require('./rol.routes');
const serviceRoutes = require('./service.routes');
const shelfRoutes = require('./shelf.routes');
const spacesRoutes = require('./spaces.routes');
const storageRoutes = require('./storage.routes');
const userRoutes = require('./user.routes');

// Register all routes
router.use('/buys', buysRoutes);
router.use('/divisions', divisionsRoutes);
router.use('/items', itemRoutes);
router.use('/providers', providersRoutes);
router.use('/roles', rolRoutes);
router.use('/services', serviceRoutes);
router.use('/shelves', shelfRoutes);
router.use('/spaces', spacesRoutes);
router.use('/storage', storageRoutes);
router.use('/users', userRoutes);

'http://localhost:3000/api/buys/updateBuy'

// Home route
router.get('/', (req, res) => {
    res.json({ message: 'PodoCenter API' });
});

module.exports = router;