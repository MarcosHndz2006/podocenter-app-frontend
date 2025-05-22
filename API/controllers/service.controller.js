// controllers/service.controller.js
const db = require('../db/connection');

// Get all services
exports.getAllServices = async (req, res, next) => {
    try {
        const services = await db('servicio').select('*')
            .join('usuario', 'usuario.id_usuario', 'servicio.id_usuario')
            .join('rol', 'rol.id_rol', 'usuario.id_rol')
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .join('clasificacion', 'clasificacion.id_clasificacion', 'servicio.id_clasificacion')
            .join('subclasificacion', 'subclasificacion.id_subclasificacion', 'servicio.id_subclasificacion')
            .join('estado', 'servicio.id_estado', 'estado.id_estado');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get a single service by ID
exports.getServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await db('servicio').where('id_usuario', id).first();

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
exports.createService = async (req, res, next) => {
    try {
        const serviceData = req.body.service;
        
        /* creando nuevo servicio */
        const result = await db('servicio')
            .insert({
                nombre_servicio: serviceData.nombre_servicio,
                unidad_servicio: serviceData.unidad_servicio,
                precio_unitario: serviceData.precio_unitario,
                cuenta_cargo: null,
                cuenta_abono: null,
                id_espacio: serviceData.id_espacio,
                id_usuario: serviceData.id_usuario,
                id_clasificacion: serviceData.id_clasificacion,
                id_subclasificacion: serviceData.id_subclasificacion,
                id_estado: 1
            })

        /* cambiando el estado del espacio ocupado por el nuevo servicio */
        const spaceOccupied = await db('espacio').where('id_espacio', serviceData.id_espacio).update('id_estado_espacio', 2)

        if (!result) {
            return res.status(404).json({ message: "failed in create service" })
        }

        return res.status(200).json({ message: "OK" })

    } catch (error) {
        next(error);
    }
};

// Update a service
exports.updateService = async (req, res, next) => {
    try {
        const { id, id_estado } = req.body;

        let updated = ""

        if (id_estado != "" || id_estado != null || id_estado != undefined || !id_estado) {
            updated = updated = await db('servicio').where('id_servicio', id).update('id_estado', id_estado);
        }

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: "OK"
        });

    } catch (error) {
        next(error);
    }
};

// Delete a service
exports.deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('servicio').where('id_servicio', id).del();

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
exports.getServicesByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const services = await db('servicio').where('id_usuario', userId)
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get services by space ID
exports.getServicesBySpaceId = async (req, res, next) => {
    try {
        const { spaceId } = req.params;
        const services = await db('servicio').where('id_espacio', spaceId).select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get services by state
exports.getServicesByState = async (req, res, next) => {
    try {
        const { state } = req.params;
        const services = await db('servicio').where('id_estado', state).select('*');

        res.status(200).json({
            status: 'success',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// Get all service clasifications
exports.getServiceClasifications = async (req, res, next) => {
    try {
        const data = await db('clasificacion').select('*')

        if (!data) {
            return res.status(404).json({ message: "clasifications not founded" })
        }

        return res.status(200).json({ message: "OK", data: data })
    } catch (error) {
        next(error)
    }
}

//Get all service subclasifications
exports.getServiceSubclasifications = async (req, res, next) => {
    try {
        const data = await db('subclasificacion').select('*')

        if (!data) {
            return res.status(404).json({ message: "Subclasifications not founded" })
        }

        return res.status(200).json({ message: "OK", data: data })

    } catch (error) {
        next(error)
    }
}