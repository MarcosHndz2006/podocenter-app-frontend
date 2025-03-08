// controllers/user.controller.js
const db = require('../db/connection');

// Get all users
exports.getAllUsers = async(req, res, next) => {
    try {
        const users = await db('user').select('*');
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
exports.getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        /* innerjoin rol table */
        const user = await db('user')
            .join('rol', 'user.idRol', 'rol.idRol')
            .where('idUser', id)
            .select('user.*', 'rol.rolName')
            .first();

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Create a new user
exports.createUser = async(req, res, next) => {
    try {
        const userData = req.body;

        // Validate required fields
        if (!userData.username || !userData.password) {
            return res.status(400).json({
                status: 'error',
                message: 'Username and password are required'
            });
        }

        const [id] = await db('user').insert(userData);
        const newUser = await db('user').where('idUser', id).first();

        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

// Update a user
exports.updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updated = await db('user').where('idUser', id).update(userData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const updatedUser = await db('user').where('idUser', id).first();

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('user').where('idUser', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};