const knex = require('../db/connection'); // Assuming you have a database connection setup with Knex


// Create a new storage entry
exports.createStorage = async (req, res) => {
    const storage = req.body;
    try {
        const [id_almacen] = await knex('almacen').insert(storage);
        res.status(201).json({ id_almacen, ...storage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating storage', error });
    }
}

// Get all storage entries
exports.getAllStorage = async (req, res) => {
    try {
        const storage = await knex('almacen').select('*');
        res.json(storage);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving storage', error });
    }
}

// Get all storage with shelfs
exports.getAllStorageWithShelfs = async (req, res) => {
    try {
        const storages = await knex('almacen').select('*')
        const shelfs = await knex('estante').select('*')

        const storagesList = storages.map(str => {
            const filterShelfs = shelfs.filter(shelf => shelf.id_almacen === str.id_almacen);
            return {
                storage: str,
                shelfs: filterShelfs
            };
        });

        //console.dir(storagesList, { depth: null });
        res.json(storagesList)
    } catch (error) {
        res.status(404).json({ message: 'Error to found storages', error })
    }
}

// Get a storage entry by ID
exports.getStorage = async (req, res) => {
    const { idStorage } = req.params;
    try {
        const storage = await knex('almacen').where({ idStorage }).first();
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
exports.updateStorage = async (req, res) => {
    const { idStorage } = req.params;
    const updatedStorage = req.body;
    try {
        const result = await knex('almacen').where({ idStorage }).update(updatedStorage);
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
exports.deleteStorage = async (req, res) => {
    const { idStorage } = req.params;

    try {
        let result
        const shelfs = await knex('estante').where('id_almacen', idStorage).select('*')

        if (shelfs.length == 0) {
            result = await knex('almacen').where('id_almacen', idStorage).del();

            if (result) {
                res.json({ message: 'Storage deleted successfully' });
            } else {
                res.status(404).json({ message: 'Storage not found' });
            }

        } else {
            return res.status(400).json({ message: "El almacén contiene estantes en uso" })
        }

    } catch (error) {
        res.status(500).json({ message: 'Error deleting storage', error });
    }
}


module.exports