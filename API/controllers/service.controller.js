// controllers/service.controller.js
const db = require('../db/connection');

// Get all services
exports.getAllServices = async(req, res, next) => {
    try {
        const services = await db('service').select('*');
        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get a single service by ID
exports.getServiceById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const service = await db('service').where('userId', id).first();

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// Create a new service
exports.createService = async(req, res, next) => {
    try {
        const serviceData = req.body;

        // Convert JSON string to JSON object if needed
        if (typeof serviceData.ListItems === 'string') {
            serviceData.ListItems = JSON.parse(serviceData.ListItems);
        }

        // Validate required fields
        if (!serviceData.name) {
            return res.status(400).json({
                status: 'error',
                message: 'Service name is required'
            });
        }

        const [id] = await db('service').insert(serviceData);
        const newService = await db('service').where('idService', id).first();

        res.status(201).json({
            status: 'success',
            data: newService
        });
    } catch (error) {
        next(error);
    }
};

// Update a service
exports.updateService = async(req, res, next) => {
    try {
        const { id } = req.params;
        let serviceData = req.body;

        // Convert JSON string to JSON object if needed
        if (typeof serviceData.ListItems === 'string') {
            serviceData.ListItems = JSON.parse(serviceData.ListItems);
        }

        const updated = await db('service').where('idService', id).update(serviceData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        const updatedService = await db('service').where('idService', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedService
        });
    } catch (error) {
        next(error);
    }
};

// Delete a service
exports.deleteService = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('service').where('idService', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get services by user ID
exports.getServicesByUserId = async(req, res, next) => {
    try {
        const { userId } = req.params;
        const services = await db('service').where('idUser', userId).select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get services by space ID
exports.getServicesBySpaceId = async(req, res, next) => {
    try {
        const { spaceId } = req.params;
        const services = await db('service').where('idSpace', spaceId).select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get services by state
exports.getServicesByState = async(req, res, next) => {
    try {
        const { state } = req.params;
        const services = await db('service').where('state', state).select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};