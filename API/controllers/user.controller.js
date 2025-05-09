// controllers/user.controller.js
const db = require('../db/connection');

//autenticación de usuario
exports.authUser = async (req, res, next) => {

    const infoUser = req.body

    try {
        const user = await db('usuario')
            .join('rol', 'usuario.id_rol', 'rol.id_rol')
            .where({
                username: infoUser.username,
                password: infoUser.password
            })
            .select('usuario.id_usuario', 'usuario.nombres', 'usuario.apellidos',
                'usuario.username', 'usuario.cuenta_abono', 'usuario.cuenta_ahorro',
                'usuario.id_rol', 'rol.nombre_puesto', 'rol.unidad_servicio',
                'rol.costo_unidad_servicio')

        if (!user || user.length == 0) {
            return res.status(404).json({
                data: [],
                message: "not found"
            })
        } else {
            return res.status(200).json({
                data: user,
                message: "success"
            })
        }

    } catch (error) {
        next(error)
    }

}

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        /* variable donde se almacenan todos los usuarios */
        const users = await db('usuario')
            .join('rol', 'usuario.id_rol', 'rol.id_rol')
            .select('usuario.id_usuario', 'usuario.nombres', 'usuario.apellidos',
                'usuario.username', 'usuario.cuenta_abono', 'usuario.cuenta_ahorro',
                'rol.nombre_puesto', 'rol.unidad_servicio', 'rol.id_rol',
                'rol.costo_unidad_servicio');

        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        /* innerjoin rol table */
        const user = await db('usuario')
            .join('rol', 'usuario.id_rol', 'rol.id_rol')
            .where('id_usuario', id)
            .select('usuario.*', 'rol.*' )
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

/* get users by rol */
exports.getUsersByRol = async (req, res, next) => {

    const id = req.params.id

    try {
        const users = await db('usuario')
            .join('rol', 'usuario.id_rol', 'rol.id_rol')
            .where('usuario.id_rol', id)
            .select('usuario.id_usuario', 'usuario.nombres', 'usuario.apellidos',
                'usuario.username', 'usuario.cuenta_abono', 'usuario.cuenta_ahorro',
                'rol.nombre_puesto', 'rol.unidad_servicio',
                'rol.costo_unidad_servicio');

        if (!users) {
            return res.status(404).json({
                status: 'error',
                message: 'Users not found'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: users
        })

    } catch (error) {
        next(error)
    }
}

// Create a new user
exports.createUser = async (req, res, next) => {
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
exports.updateUser = async (req, res, next) => {
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
exports.deleteUser = async (req, res, next) => {
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