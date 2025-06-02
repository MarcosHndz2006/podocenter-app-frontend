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
        const service = await db('servicio').where('id_servicio', id)
            .join('clasificacion', 'clasificacion.id_clasificacion', 'servicio.id_clasificacion')
            .join('subclasificacion', 'subclasificacion.id_subclasificacion', 'servicio.id_subclasificacion')
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .join('usuario', 'usuario.id_usuario', 'servicio.id_usuario');

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

exports.updateInfoService = async (req, res, next) => {

    const identifier = req.params.identifier
    const serviceInfo = req.body
    let result = []

    try {
        // Se obtiene el identificador del espacio anteriormente utilizado por el servicio a actualizar
        const serviceSpacePrev = await db('servicio').where('id_servicio', identifier).select('id_espacio')

        // Si no se obtienen un resultado entonces se retorna que hubo un conflicto encontrando ese espacio anteriormente
        //usado por el servicio
        if (serviceSpacePrev != [] || serviceSpacePrev.length != 0) {

            // se actualiza el estado de ese espacio encontrado
            const updateSpace = await db('espacio').where('id_espacio', serviceSpacePrev[0].id_espacio)
                .update('id_estado_espacio', 1)

            // Si no se obtiene un resultado favorable se informa que no se pudo cambiar el estado del espacio
            if (updateSpace.length != 0 || updateSpace != []) {

                //Se actualiza la información del servicio
                result = await db('servicio').where('id_servicio', identifier).update({
                    nombre_servicio: serviceInfo.nombre_servicio,
                    unidad_servicio: serviceInfo.unidad_servicio,
                    precio_unitario: serviceInfo.precio_unitario,
                    id_espacio: serviceInfo.id_espacio,
                    id_usuario: serviceInfo.id_usuario,
                    id_clasificacion: serviceInfo.id_clasificacion,
                    id_subclasificacion: serviceInfo.id_subclasificacion,
                    id_estado: serviceInfo.id_estado
                })

                // Se actualiza el estado del nuevo espacio a utilizar 
                const spaceState = await db('espacio').where('id_espacio', serviceInfo.id_espacio)
                    .update('id_estado_espacio', 2)

                // Si se obtiene un resultado favorable se retorna OK
                if (result && spaceState) {

                    return res.status(200).json({ message: "OK", data: "Servicio actualizado" })
                }

                return res.status(409).json({ message: "No se pudo actualizar el servicio porque no se pudo cambiar el estado del espacio seleccionado" })

            } else {
                return res.status(409)
                    .json({
                        message: "No se puede actualizar la información del servicio porque no se pudo cambiar el estado del espacio anterior"
                    })
            }
        }
        else {
            return res.status(409)
                .json({
                    message: "no se pudo actualizar el servicio porque no se encontró el identificador del espacio anterior"
                })
        }


    } catch (error) {
        next(error)
        return res.status(500).json({ message: "server error!", error: error })
    }
}

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