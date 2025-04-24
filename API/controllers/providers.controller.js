// controllers/providers.controller.js
const db = require('../db/connection');

// Get all providers
exports.getAllProviders = async(req, res, next) => {
    try {
        const providers = await db('proveedor').select('*');
        res.status(200).json({
            status: 'success',
            data: providers
        });
    } catch (error) {
        next(error);
    }
};

// Get a single provider by ID
exports.getProviderById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const provider = await db('providers').where('idProviders', id).first();

        if (!provider) {
            return res.status(404).json({
                status: 'error',
                message: 'Provider not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: provider
        });
    } catch (error) {
        next(error);
    }
};

// Create a new provider
exports.createProvider = async(req, res, next) => {
    try {
        const providerData = req.body;

        // Validate required fields
        if (!providerData.name) {
            return res.status(400).json({
                status: 'error',
                message: 'Provider name is required'
            });
        }

        const [id] = await db('providers').insert(providerData);
        const newProvider = await db('providers').where('idProviders', id).first();

        res.status(201).json({
            status: 'success',
            data: newProvider
        });
    } catch (error) {
        next(error);
    }
};

// Update a provider
exports.updateProvider = async(req, res, next) => {
    try {
        const { id } = req.params;
        const providerData = req.body;

        const updated = await db('providers').where('idProviders', id).update(providerData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Provider not found'
            });
        }

        const updatedProvider = await db('providers').where('idProviders', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedProvider
        });
    } catch (error) {
        next(error);
    }
};

// Delete a provider
exports.deleteProvider = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('providers').where('idProviders', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Provider not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Provider deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};