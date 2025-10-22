// controllers/providers.controller.js
const db = require('../db/connection');

// Get all providers
exports.getAllProviders = async (req, res, next) => {
    try {

        const providers = await db('proveedor').select('*');

        if (!providers || providers.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Proveedores no encontrados.'
            })
        }

        return res.status(200).json({
            status: 'success',
            data: providers
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get a single provider by ID
exports.getProviderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const provider = await db('proveedor').where('id_proveedor', id).first();

        if (!provider) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el proveedor solicitado.'
            });
        }

        res.status(200).json({
            status: 'success',
            data: provider
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Create a new provider
exports.createProvider = async (req, res, next) => {
    try {
        const providerData = req.body;

        // Validate required fields
        if (!providerData) {
            return res.status(400).json({
                status: 'error',
                message: 'No se han propocionado datos para crear un proveedor.'
            });
        }

        const [id] = await db('proveedor').insert(providerData);
        const newProvider = await db('proveedor').where('id_proveedor', id).first();

        if (newProvider) {
            return res.status(201).json({
                status: 'success',
                message: 'Proveedor creado con éxito'
            });
        }

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Update a provider
exports.updateProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const providerData = req.body;

        const updated = await db('proveedor').where('id_proveedor', id).update(providerData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el proveedor para actualizar'
            });
        }

        const updatedProvider = await db('proveedor').where('id_proveedor', id).first();

        if (updatedProvider) {
            return res.status(200).json({
                status: 'success',
                message: 'Proveedor actualizado con éxito'
            });
        }

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Delete a provider
exports.deleteProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deleted = await db('proveedor').where('id_proveedor', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el proveedor a eliminar'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Proveedor eliminado con éxito'
        });
    } catch (error) {
        next(error);
    }
};