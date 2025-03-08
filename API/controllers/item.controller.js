// controllers/item.controller.js
const db = require('../db/connection');

// Get all items
exports.getAllItems = async(req, res, next) => {
    try {
        const items = await db('item').select('*');
        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};

// Get a single item by ID
exports.getItemById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const item = await db('item').where('idItem', id).first();

        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: item
        });
    } catch (error) {
        next(error);
    }
};

// Create a new item
exports.createItem = async(req, res, next) => {
    try {
        const itemData = req.body;

        // Validate required fields
        if (!itemData.comercialName) {
            return res.status(400).json({
                status: 'error',
                message: 'Commercial name is required'
            });
        }

        const [id] = await db('item').insert(itemData);
        const newItem = await db('item').where('idItem', id).first();

        res.status(201).json({
            status: 'success',
            data: newItem
        });
    } catch (error) {
        next(error);
    }
};

// Update an item
exports.updateItem = async(req, res, next) => {
    try {
        const { id } = req.params;
        const itemData = req.body;

        const updated = await db('item').where('idItem', id).update(itemData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        const updatedItem = await db('item').where('idItem', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedItem
        });
    } catch (error) {
        next(error);
    }
};

// Delete an item
exports.deleteItem = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('item').where('idItem', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Item deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get items by classification
exports.getItemsByClassification = async(req, res, next) => {
    try {
        const { classificationId } = req.params;
        const items = await db('item').where('Clasiffication', classificationId).select('*');

        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};

// Get items nearing expiry
exports.getItemsNearingExpiry = async(req, res, next) => {
    try {
        const daysThreshold = req.query.days || 30;
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + parseInt(daysThreshold));

        const items = await db('item')
            .whereBetween('expDate', [now.toISOString(), futureDate.toISOString()])
            .select('*');

        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};