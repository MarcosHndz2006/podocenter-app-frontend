// controllers/rol.controller.js
const db = require('../db/connection');

// Get all roles
exports.getAllRoles = async(req, res, next) => {
    try {
        const roles = await db('rol').select('*');
        res.status(200).json({
            status: 'success',
            data: roles
        });
    } catch (error) {
        next(error);
    }
};

// Get a single role by ID
exports.getRoleById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const role = await db('rol').where('idRol', id).first();

        if (!role) {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: role
        });
    } catch (error) {
        next(error);
    }
};

// Create a new role
exports.createRole = async(req, res, next) => {
    try {
        const roleData = req.body;

        // Validate required fields
        if (!roleData.rolName) {
            return res.status(400).json({
                status: 'error',
                message: 'Role name is required'
            });
        }

        const [id] = await db('rol').insert(roleData);
        const newRole = await db('rol').where('idRol', id).first();

        res.status(201).json({
            status: 'success',
            data: newRole
        });
    } catch (error) {
        next(error);
    }
};

// Update a role
exports.updateRole = async(req, res, next) => {
    try {
        const { id } = req.params;
        const roleData = req.body;

        const updated = await db('rol').where('idRol', id).update(roleData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found'
            });
        }

        const updatedRole = await db('rol').where('idRol', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedRole
        });
    } catch (error) {
        next(error);
    }
};

// Delete a role
exports.deleteRole = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('rol').where('idRol', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Role not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Role deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get roles by service unit
exports.getRolesByServiceUnit = async(req, res, next) => {
    try {
        const { serviceUnit } = req.params;
        const roles = await db('rol').where('serviceUnit', serviceUnit).select('*');

        res.status(200).json({
            status: 'success',
            data: roles
        });
    } catch (error) {
        next(error);
    }
};