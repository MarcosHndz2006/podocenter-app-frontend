// controllers/rol.controller.js
const db = require('../db/connection');

// Get all roles
exports.getAllRoles = async (req, res, next) => {
    try {

        const roles = await db('rol').select('id_rol', 'nombre_puesto');

        if (!roles) {
            return res.status(404).json({
                status: 'Not Found',
                message: "No se encontraron datos de roles"
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: roles
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

exports.getAllInfoFromRoles = async (req, res, next) => {
    try {

        const roles = await db('rol').select('*');

        if (!roles) {
            return res.status(404).json({
                status: 'Not Found',
                message: "No se encontraron datos de roles"
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: roles
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
}

// Get a single role by ID
exports.getRoleById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intenta de nuevo'
            })
        }

        const role = await db('rol').where('id_rol', id).first();

        if (!role) {
            return res.status(404).json({
                status: 'error',
                message: 'Rol no encontrado.'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: role
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Create a new role
exports.createRole = async (req, res, next) => {
    try {
        const roleData = req.body;

        // Validate required fields
        if (!roleData) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'La información de rol proporcionada es incorrecta. Intente de nuevo.'
            });
        }

        const [id] = await db('rol').insert(roleData);
        const newRole = await db('rol').where('id_rol', id).first();

        if (!newRole) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'No se creó el rol. Intente de nuevo'
            })
        }

        return res.status(201).json({
            status: 'Success',
            message: 'Rol creado con éxito.'
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Update a role
exports.updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roleData = req.body;

        if (!id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intente de nuevo'
            })
        }

        if (!roleData) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'La información proporcionada es incorrecta. Intente de nuevo.'
            })
        }

        const updated = await db('rol').where('id_rol', id).update(roleData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Rol no actualizado. Verifiqué si el id es correcto o la información proporcionada es correcta. '
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Rol actualizado con éxito'
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Delete a role
exports.deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Id proporcionado incorrect. Intente de nuevo.'
            })
        }

        const deleted = await db('rol').where('id_rol', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'No se pudo eliminar el rol correctamente. Intente de nuevo.'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Rol eliminado con éxito'
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get roles by service unit
// exports.getRolesByServiceUnit = async (req, res, next) => {
//     try {
//         const { serviceUnit } = req.params;
//         const roles = await db('rol').where('serviceUnit', serviceUnit).select('*');

//         res.status(200).json({
//             status: 'Success',
//             data: roles
//         });
//     } catch (error) {
//         next(error);
//     }
// };