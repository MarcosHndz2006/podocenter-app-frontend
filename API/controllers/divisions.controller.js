// controllers/divisions.controller.js
const db = require('../db/connection');

// Get all divisions
exports.getAllDivisions = async(req, res, next) => {
    try {
        const divisions = await db('divisions').select('*');
        res.status(200).json({
            status: 'success',
            data: divisions
        });
    } catch (error) {
        next(error);
    }
};

// Get a single division by ID
exports.getDivisionById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const division = await db('divisions').where('idDivisions', id).first();

        if (!division) {
            return res.status(404).json({
                status: 'error',
                message: 'Division not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: division
        });
    } catch (error) {
        next(error);
    }
};

// Create a new division
exports.createDivision = async(req, res, next) => {
    try {
        const divisionData = req.body;

        const [id] = await db('divisions').insert(divisionData);
        const newDivision = await db('divisions').where('idDivisions', id).first();

        res.status(201).json({
            status: 'success',
            data: newDivision
        });
    } catch (error) {
        next(error);
    }
};

// Update a division
exports.updateDivision = async(req, res, next) => {
    try {
        const { id } = req.params;
        const divisionData = req.body;

        const updated = await db('divisions').where('idDivisions', id).update(divisionData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Division not found'
            });
        }

        const updatedDivision = await db('divisions').where('idDivisions', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedDivision
        });
    } catch (error) {
        next(error);
    }
};

// Delete a division
exports.deleteDivision = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('divisions').where('idDivisions', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Division not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Division deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get divisions by shelf ID
exports.getDivisionsByShelfId = async(req, res, next) => {
    try {
        const { shelfId } = req.params;
        const divisions = await db('divisions').where('idShelf', shelfId).select('*');

        res.status(200).json({
            status: 'success',
            data: divisions
        });
    } catch (error) {
        next(error);
    }
};

// Get divisions by item ID
exports.getDivisionsByItemId = async(req, res, next) => {
    try {
        const { itemId } = req.params;
        const divisions = await db('divisions').where('idItem', itemId).select('*');

        res.status(200).json({
            status: 'success',
            data: divisions
        });
    } catch (error) {
        next(error);
    }
};