// controllers/shelf.controller.js
const db = require('../db/connection');

// Get all shelves
exports.getAllShelves = async(req, res, next) => {
    try {
        const shelves = await db('shelf').select('*');
        res.status(200).json({
            status: 'success',
            data: shelves
        });
    } catch (error) {
        next(error);
    }
};

// Get a single shelf by ID
exports.getShelfById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const shelf = await db('shelf').where('idShelf', id).first();

        if (!shelf) {
            return res.status(404).json({
                status: 'error',
                message: 'Shelf not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: shelf
        });
    } catch (error) {
        next(error);
    }
};

// Create a new shelf
exports.createShelf = async(req, res, next) => {
    try {
        const shelfData = req.body;

        // Validate required fields
        if (!shelfData.name || !shelfData.levelsNumber) {
            return res.status(400).json({
                status: 'error',
                message: 'Shelf name and levels number are required'
            });
        }

        const [id] = await db('shelf').insert(shelfData);
        const newShelf = await db('shelf').where('idShelf', id).first();

        res.status(201).json({
            status: 'success',
            data: newShelf
        });
    } catch (error) {
        next(error);
    }
};

// Update a shelf
exports.updateShelf = async(req, res, next) => {
    try {
        const { id } = req.params;
        const shelfData = req.body;

        const updated = await db('shelf').where('idShelf', id).update(shelfData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Shelf not found'
            });
        }

        const updatedShelf = await db('shelf').where('idShelf', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedShelf
        });
    } catch (error) {
        next(error);
    }
};

// Delete a shelf
exports.deleteShelf = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('shelf').where('idShelf', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Shelf not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Shelf deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get shelves by storage ID
exports.getShelvesByStorageId = async(req, res, next) => {
    try {
        const { storageId } = req.params;
        const shelves = await db('shelf').where('idStorage', storageId).select('*');

        res.status(200).json({
            status: 'success',
            data: shelves
        });
    } catch (error) {
        next(error);
    }
};

// Get available shelves (not full)
exports.getAvailableShelves = async(req, res, next) => {
    try {
        const shelves = await db('shelf').where('full', 0).select('*');

        res.status(200).json({
            status: 'success',
            data: shelves
        });
    } catch (error) {
        next(error);
    }
};