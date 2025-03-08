const knex = require('../db/connection'); // Assuming you have a database connection setup with Knex

class StorageController {
    // Create a new storage entry
    async createStorage(req, res) {
        const storage = req.body;
        try {
            const [idStorage] = await knex('storage').insert(storage).returning('idStorage');
            res.status(201).json({ idStorage, ...storage });
        } catch (error) {
            res.status(500).json({ message: 'Error creating storage', error });
        }
    }

    // Get all storage entries
    async getAllStorage(req, res) {
        try {
            const storage = await knex('storage').select('*');
            res.json(storage);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving storage', error });
        }
    }

    // Get a storage entry by ID
    async getStorage(req, res) {
        const { idStorage } = req.params;
        try {
            const storage = await knex('storage').where({ idStorage }).first();
            if (storage) {
                res.json(storage);
            } else {
                res.status(404).json({ message: 'Storage not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving storage', error });
        }
    }

    // Update a storage entry by ID
    async updateStorage(req, res) {
        const { idStorage } = req.params;
        const updatedStorage = req.body;
        try {
            const result = await knex('storage').where({ idStorage }).update(updatedStorage);
            if (result) {
                res.json({ message: 'Storage updated successfully' });
            } else {
                res.status(404).json({ message: 'Storage not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating storage', error });
        }
    }

    // Delete a storage entry by ID
    async deleteStorage(req, res) {
        const { idStorage } = req.params;
        try {
            const result = await knex('storage').where({ idStorage }).del();
            if (result) {
                res.json({ message: 'Storage deleted successfully' });
            } else {
                res.status(404).json({ message: 'Storage not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting storage', error });
        }
    }
}

module.exports = new StorageController();