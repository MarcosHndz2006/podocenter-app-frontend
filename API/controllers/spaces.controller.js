const knex = require('../db/connection'); // Assuming you have a database connection setup with Knex

class SpacesController {
    // Create a new space entry
    async createSpace(req, res) {
        const space = req.body.space;

        try {
            const result = await knex('espacio').insert({
                nombre_espacio: space.nombre_espacio,
                unidad_servicio_espacio: space.unidad_servicio_espacio,
                costo_unidad_servicio_espacio: space.costo_unidad_servicio_espacio,
                cuenta_cargo: '',
                cuenta_abono: '',
                id_estado_espacio: 1
            })

            if (result) {
                return res.status(200).json({ message: "OK" });
            }
            return res.status(400).json({ message: "Error creating space" })
        } catch (error) {
            res.status(500).json({ message: 'Error creating space', error });
        }
    }

    // Get all space entries
    async getAllSpaces(req, res) {
        try {
            const spaces = await knex('espacio').select('*')
                .join('estado_espacio', 'estado_espacio.id_estado_espacio',
                    'espacio.id_estado_espacio'
                );
            res.json(spaces);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving spaces', error });
        }
    }

    // Get a space entry by ID
    async getSpaceById(req, res) {
        const { idSpaces } = req.params;
        try {
            const space = await knex('espacio').where('id_espacio', idSpaces).first();
            if (space) {
                res.json(space);
            } else {
                res.status(404).json({ message: 'Space not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving space', error });
        }
    }

    // Update a space entry by ID
    async updateSpace(req, res) {
        const { id, id_estado } = req.body;

        try {
            const result = await knex('espacio').where('id_espacio', id).update('id_estado_espacio', id_estado);
            if (result) {
                res.json({ message: 'Space updated successfully' });
            } else {
                res.status(404).json({ message: 'Space not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating space', error });
        }
    }

    // Update info space
    async updateInfoSpace(req, res, next) {
        const spaceInfo = req.body
        const id = req.params.id

        try {
            const service = await knex('servicio').where('id_espacio', id).select('*')
            let result
            if (service.length != 0) {
                if (spaceInfo.id_estado_espacio == 1 || spaceInfo.id_estado_espacio == 3) {
                    return res.status(409)
                        .json({ message: "No se puede actualizar el estado del espacio porque está siendo ocupado por un servicio" })
                } else {
                    result = await knex('espacio').where('id_espacio', id).update(spaceInfo)
                    return res.status(200).json({ message: "OK, actualizado" })
                }
            } else {
                result = await knex('espacio').where('id_espacio', id).update(spaceInfo)
                return res.status(200).json({ message: "OK, actualizado" })
            }
        } catch (error) {
            next(error)
            return res.status(500).json({ message: "Falla del servidor", error: error })
        }
    }

    // Delete a space entry by ID
    async deleteSpace(req, res) {
        const { idSpaces } = req.params;
        try {

            const service = await knex('servicio').where('id_espacio', idSpaces).select('*')

            if (service.length == 0) {
                const result = await knex('espacio').where('id_espacio', idSpaces).del();
                console.log(result)
                if (result) {
                    res.status(200).json({ message: 'Space deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Space not found' });
                }
            } else {
                return res.status(404).json({ message: "No se puede eliminar el espacio porque está siendo usado en un servicio" })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting space', error });
        }
    }

    async getSpaceStates(req, res, next) {
        try {
            let states = await knex('estado_espacio').select('*')

            if (states.length == 0) {
                return res.status(404).json({ message: "Estados no encontrados" })
            }

            return res.status(200).json({ message: "Estados encontrados", data: states })

        } catch (error) {
            next(error)
            return res.status(500).json({ message: "error in server", error: error })
        }
    }
}

module.exports = new SpacesController();