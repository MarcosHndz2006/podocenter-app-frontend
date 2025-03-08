const knex = require('../db/connection'); // Assuming you have a database connection setup with Knex

class SpacesController {
    // Create a new space entry
    async createSpace(req, res) {
        const space = req.body;
        try {
            const [idSpaces] = await knex('spaces').insert(space).returning('idSpaces');
            res.status(201).json({ idSpaces, ...space });
        } catch (error) {
            res.status(500).json({ message: 'Error creating space', error });
        }
    }

    // Get all space entries
    async getAllSpaces(req, res) {
        try {
            const spaces = await knex('spaces').select('*');
            res.json(spaces);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving spaces', error });
        }
    }

    // Get a space entry by ID
    async getSpaceById(req, res) {
        const { idSpaces } = req.params;
        try {
            const space = await knex('spaces').where({ idSpaces }).first();
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
        const { idSpaces } = req.params;
        const updatedSpace = req.body;
        try {
            const result = await knex('spaces').where({ idSpaces }).update(updatedSpace);
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
            const result = await knex('spaces').where({ idSpaces }).del();
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