// controllers/service.controller.js
const db = require('../db/connection');

// Get all services
exports.getAllServices = async (req, res, next) => {
    try {

        const services = await db('servicio').select('servicio.id_servicio',
            'servicio.nombre_servicio', 'servicio.unidad_servicio', 'servicio.precio_unitario',
            'servicio.estado_servicio', 'usuario.nombres', 'usuario.apellidos', 'rol.nombre_puesto',
            'espacio.nombre_espacio', 'clasificacion_servicio.nombre_clasificacion_servicio',
            'subclasificacion_servicio.nombre_subclasificacion_servicio', 'servicio.id_espacio',
            'servicio.id_clasificacion_servicio', 'servicio.id_subclasificacion_servicio'
        )
            .join('usuario', 'usuario.id_usuario', 'servicio.id_usuario')
            .join('rol', 'rol.id_rol', 'usuario.id_rol')
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .join('clasificacion_servicio', 'clasificacion_servicio.id_clasificacion_servicio', 'servicio.id_clasificacion_servicio')
            .join('subclasificacion_servicio', 'subclasificacion_servicio.id_subclasificacion_servicio', 'servicio.id_subclasificacion_servicio')

        if (!services) {
            return res.status(204).json({
                status: 'Not Found',
                message: 'No se encontraron servicios activos o creados.'
            })
        }

        return res.status(200).json({
            status: 'Success',
            data: services
        });


    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get a single service by ID
exports.getServiceById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Parámetro incorrecto. Intente de nuevo'
            })
        }

        const service = await db('servicio').where('id_servicio', id)
            .join('clasificacion_servicio', 'clasificacion_servicio.id_clasificacion_servicio', 'servicio.id_clasificacion_servicio')
            .join('subclasificacion_servicio', 'subclasificacion_servicio.id_subclasificacion_servicio', 'servicio.id_subclasificacion_servicio')
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .join('usuario', 'usuario.id_usuario', 'servicio.id_usuario')
            .select('servicio.id_servicio',
                'servicio.nombre_servicio', 'servicio.unidad_servicio', 'servicio.precio_unitario',
                'servicio.estado_servicio', 'usuario.nombres', 'usuario.apellidos', 'rol.nombre_puesto',
                'espacio.nombre_espacio', 'clasificacion_servicio.nombre_clasificacion_servicio',
                'subclasificacion_servicio.nombre_subclasificacion_servicio', 'servicio.id_espacio',
                'servicio.id_clasificacion_servicio', 'servicio.id_subclasificacion_servicio'
            ).first();

        if (!service) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Servicio no encontrado'
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: service
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Create a new service
exports.createService = async (req, res, next) => {
    try {

        const serviceData = req.body.service;

        if (!serviceData) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'La información proporcionada para crear el servicio no es válida. Intente de nuevo.'
            })
        } else if (serviceData.length === 0) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'No haz enviado ninguna información para crear un servicio. Intenta de nuevo.'
            })
        }

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
                id_clasificacion_servicio: serviceData.id_clasificacion_servicio,
                id_subclasificacion_servicio: serviceData.id_subclasificacion_servicio,
                estado_servicio: 0
            })

        /* cambiando el estado del espacio ocupado por el nuevo servicio */
        const spaceOccupied = await db('espacio').where('id_espacio', serviceData.id_espacio).update('estado_espacio', 2)

        if (!result) {
            return res.status(404).json({
                status: 'Not Found',
                message: "Fallo en crear el servicio. Intente de nuevo."
            })
        } else if (!spaceOccupied) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'No se pudo modificar el espacio a ocupar en el servicio. Intente de nuevo.'
            })
        }

        return res.status(200).json({ status: 'Success', message: "Servicio creado con éxito" })

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Update a service
exports.updateServiceState = async (req, res, next) => {
    try {

        const { id, id_estado } = req.body;

        if (!id) {
            return res.status(404).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intente de nuevo'
            })
        } else if (!id_estado) {
            return res.status(404).json({
                status: 'Bad Request',
                message: 'El valor del estado a cambiar es incorrecto. Intente de nuevo'
            })
        }

        let updated = ""

        if (id_estado != "" || id_estado != null || id_estado != undefined || !id_estado) {
            updated = await db('servicio').where('id_servicio', id).update('id_estado', id_estado);
        }

        if (!updated) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'El servicio no ha sido actualizado. Intente de nuevo.'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: "Servicio actualizado con éxito."
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

exports.updateInfoService = async (req, res, next) => {

    const identifier = req.params.identifier
    const serviceInfo = req.body

    if (!identifier) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'El id proporcionado es incorrecto. Intente de nuevo.'
        })
    } else if (!serviceInfo) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'La información proporcionada para actualizar el servicio es incorrecta. Intente de nuevo.'
        })
    }

    let result = []

    try {
        // Se obtiene el identificador del espacio anteriormente utilizado por el servicio a actualizar
        const serviceSpacePrev = await db('servicio').where('id_servicio', identifier).select('id_espacio')

        // Si no se obtienen un resultado entonces se retorna que hubo un conflicto encontrando ese espacio anteriormente
        //usado por el servicio
        if (serviceSpacePrev != [] || serviceSpacePrev.length != 0) {

            // se actualiza el estado de ese espacio encontrado
            const updateSpace = await db('espacio').where('id_espacio', serviceSpacePrev[0].id_espacio)
                .update('estado_espacio', 1)

            // Si no se obtiene un resultado favorable se informa que no se pudo cambiar el estado del espacio
            if (updateSpace.length != 0 || updateSpace != []) {

                //Se actualiza la información del servicio
                result = await db('servicio').where('id_servicio', identifier).update({
                    nombre_servicio: serviceInfo.nombre_servicio,
                    unidad_servicio: serviceInfo.unidad_servicio,
                    precio_unitario: serviceInfo.precio_unitario,
                    id_espacio: serviceInfo.id_espacio,
                    id_usuario: serviceInfo.id_usuario,
                    id_clasificacion_servicio: serviceInfo.id_clasificacion_servicio,
                    id_subclasificacion_servicio: serviceInfo.id_subclasificacion_servicio,
                    estado_servicio: serviceInfo.estado_servicio
                })

                // Se actualiza el estado del nuevo espacio a utilizar 
                const spaceState = await db('espacio').where('id_espacio', serviceInfo.id_espacio)
                    .update('estado_espacio', 2)

                // Si se obtiene un resultado favorable se retorna OK
                if (result && spaceState) {

                    return res.status(200).json({ message: "Success", data: "Servicio actualizado" })
                }

                return res.status(409).json({ status: 'Conflict', message: "No se pudo actualizar el servicio porque no se pudo cambiar el estado del espacio seleccionado" })

            } else {
                return res.status(409)
                    .json({
                        status: 'Conflict',
                        message: "No se puede actualizar la información del servicio porque no se pudo cambiar el estado del espacio anterior"
                    })
            }
        }
        else {
            return res.status(409)
                .json({
                    status: 'Conflict',
                    message: "No se pudo actualizar el servicio porque no se encontró el identificador del espacio anterior"
                })
        }


    } catch (error) {
        next(error)
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
}

// Delete a service
exports.deleteService = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intenta de nuevo'
            })
        }

        const deleted = await db('servicio').where('id_servicio', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Servicio eliminado con éxito'
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get services by user ID
exports.getServicesByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intente de nuevo.'
            })
        }

        const services = await db('servicio').where('id_usuario', userId)
            .join('espacio', 'espacio.id_espacio', 'servicio.id_espacio')
            .select('*');

        if (!services) {
            return res.status(204).json({
                status: 'Not Found',
                message: 'No se encontraron servicios asociados al usuario'

            })
        }

        return res.status(200).json({
            status: 'Success',
            data: services
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get services by space ID
exports.getServicesBySpaceId = async (req, res, next) => {
    try {
        const { spaceId } = req.params;

        if (!spaceId) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El id proporcionado es incorrecto. Intente de nuevo.'
            })
        }

        const services = await db('servicio').where('id_espacio', spaceId).select('*');

        if (!services) {
            return res.status(204).json({
                status: 'Not Found',
                message: 'No se encontraron servicios asociados al usuario'

            })
        }

        return res.status(200).json({
            status: 'Success',
            data: services
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get services by state
exports.getServicesByState = async (req, res, next) => {
    try {
        const { state } = req.params;

        if (!state) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'El valor del estado proporcionado es incorrecto. Intente de nuevo.'
            })
        }

        const services = await db('servicio').where('id_estado', state).select('*');

        if (!services) {
            return res.status(204).json({
                status: 'Not Found',
                message: 'No se encontraron servicios asociados al usuario'

            })
        }

        return res.status(200).json({
            status: 'Success',
            data: services
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
};

// Get all service clasifications
exports.getServiceClasifications = async (req, res, next) => {
    try {
        const data = await db('clasificacion_servicio').select('*')

        if (!data) {
            return res.status(404).json({ message: "clasifications not founded" })
        }

        return res.status(200).json({ message: "OK", data: data })
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
}

//Get all service subclasifications
exports.getServiceSubclasifications = async (req, res, next) => {
    try {
        const data = await db('subclasificacion_servicio').select('*')

        if (!data) {
            return res.status(404).json({ message: "Subclasifications not founded" })
        }

        return res.status(200).json({ message: "OK", data: data })

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo.`
        });
    }
}