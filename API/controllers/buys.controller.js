// controllers/buys.controller.js
const db = require('../db/connection');

// Get all buys
exports.getAllBuys = async(req, res, next) => {
    try {
        const buys = await db('buys').select('*');
        res.status(200).json({
            status: 'success',
            data: buys
        });
    } catch (error) {   
        next(error);
    }
};

// Get a single buy by ID
exports.getBuyById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const buy = await db('buys').where('idBuys', id).first();

        if (!buy) {
            return res.status(404).json({
                status: 'error',
                message: 'Buy record not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: buy
        });
    } catch (error) {
        next(error);
    }
};

// Create a new buy
exports.createBuy = async(req, res, next) => {
    try {
        const buyData = req.body;

        // Convert JSON string to JSON object if needed
        if (typeof buyData.ListItems === 'string') {
            buyData.ListItems = JSON.parse(buyData.ListItems);
        }

        const [id] = await db('buys').insert(buyData);
        const newBuy = await db('buys').where('idBuys', id).first();

        res.status(201).json({
            status: 'success',
            data: newBuy
        });
    } catch (error) {
        next(error);
    }
};

// Update a buy
exports.updateBuy = async(req, res, next) => {
    try {
        const { id } = req.params;
        let buyData = req.body;

        // Convert JSON string to JSON object if needed
        if (typeof buyData.ListItems === 'string') {
            buyData.ListItems = JSON.parse(buyData.ListItems);
        }

        const updated = await db('buys').where('idBuys', id).update(buyData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Buy record not found'
            });
        }

        const updatedBuy = await db('buys').where('idBuys', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedBuy
        });
    } catch (error) {
        next(error);
    }
};

// Delete a buy
exports.deleteBuy = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('buys').where('idBuys', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Buy record not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Buy record deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get buys by provider ID
exports.getBuysByProviderId = async(req, res, next) => {
    try {
        const { providerId } = req.params;
        const buys = await db('buys').where('idProviders', providerId).select('*');

        res.status(200).json({
            status: 'success',
            data: buys
        });
    } catch (error) {
        next(error);
    }
};