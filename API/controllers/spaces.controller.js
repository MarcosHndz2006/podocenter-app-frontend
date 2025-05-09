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
            const space = await knex('espacio').where({ idSpaces }).first();
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

    // Delete a space entry by ID
    async deleteSpace(req, res) {
        const { idSpaces } = req.params;
        try {
            const result = await knex('espacio').where({ idSpaces }).del();
            if (result) {
                res.json({ message: 'Space deleted successfully' });
            } else {
                res.status(404).json({ message: 'Space not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting space', error });
        }
    }
}

module.exports = new SpacesController();