// controllers/item.controller.js
const db = require('../db/connection');

// Get all items
exports.getAllItems = async (req, res, next) => {
    try {
        const items = await db('producto').select('*');

        const itemsToRender = await db('producto')
            .join('casa_farmaceutica', 'producto.id_casa_farmaceutica',
                'casa_farmaceutica.id_casa_farmaceutica')
            .join('clasificacion_producto', 'producto.id_clasificacion_producto',
                'clasificacion_producto.id_clasificacion_producto'
            )
            .join('unidad', 'producto.id_unidad', 'unidad.id_unidad')
            .select('*')


        res.status(200).json({
            status: 'success',
            data: itemsToRender
        });



    } catch (error) {
        next(error);
    }
};

// Get a single item by ID
exports.getItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await db('producto')
            .join('casa_farmaceutica', 'producto.id_casa_farmaceutica',
                'casa_farmaceutica.id_casa_farmaceutica')
            .join('clasificacion_producto', 'producto.id_clasificacion_producto',
                'clasificacion_producto.id_clasificacion_producto'
            )
            .join('unidad', 'producto.id_unidad', 'unidad.id_unidad')
            .where('id_producto', id).first();

        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: item
        });
    } catch (error) {
        next(error);
    }
};

// Create a new item
exports.createItem = async (req, res, next) => {
    try {
        const itemData = req.body;
        console.log(itemData)
        // Validate required fields
        if (!itemData.comercialName) {
            return res.status(400).json({
                status: 'error',
                message: 'Commercial name is required'
            });
        }

        const [id] = await db('producto').insert({
            nombre_comercial: itemData.comercialName,
            componente_principal: itemData.principalComponent,
            componente_secundario: itemData.secondaryComponent,
            presentacion: itemData.Presentation,
            precio_unitario: itemData.price,
            id_unidad: itemData.unit,
            vencimiento: itemData.expDate,
            lote: itemData.lot,
            cuenta_cargo: null,
            id_clasificacion_producto: itemData.Clasiffication,
            id_casa_farmaceutica: itemData.farmacehouse,
            id_estante: itemData.shelf,
            existencias: itemData.quantity
        });
        const newItem = await db('producto').where('id_producto', id).first();

        res.status(201).json({
            status: 'success',
            data: newItem
        });
    } catch (error) {
        next(error);
    }
};

// Update an item
exports.updateItem = async (req, res, next) => {
    try {
        const itemData = req.body;
        console.log(itemData)
        const updated = await db('producto').where('id_producto', itemData.id_producto).update(itemData);

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        const updatedItem = await db('producto').where('id_producto', itemData.id_producto)

        res.status(200).json({
            status: 'success',
            data: updatedItem
        });
    } catch (error) {
        next(error);
    }
};

// Delete an item
exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await db('producto').where('id_producto', id).del();

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Item deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get items by classification
exports.getItemsByClassification = async (req, res, next) => {
    try {
        const { classificationId } = req.params;
        const items = await db('producto').where('id_clasificacion_producto', classificationId).select('*');

        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};

// Get items nearing expiry
exports.getItemsNearingExpiry = async (req, res, next) => {
    try {
        const daysThreshold = req.query.days || 30;
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + parseInt(daysThreshold));

        const items = await db('producto')
            .whereBetween('vencimiento', [now.toISOString(), futureDate.toISOString()])
            .select('*');

        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (error) {
        next(error);
    }
};

//Obtain items clasifications
exports.getAllProductClasifications = async (req, res, next) => {
    try {
        const clasifications = await db('clasificacion_producto').select('*');

        if (clasifications.length) {

            return res.status(200).json({
                data: clasifications,
                message: "success"
            })

        }

        return res.status(404).json({
            status: "not found",
            message: "clasificaciones no encontradas"
        })

    } catch (error) {
        next(error)
    }
}

//Obtain all items units
exports.getAllProductoUnits = async (req, res, next) => {
    try {
        const units = await db('unidad').select('*')

        if (units.length) {
            return res.status(200).json({
                data: units,
                message: "success"
            })
        }

        return res.status(404).json({
            status: '404',
            message: 'units not founded'
        })
    } catch (error) {
        next(error)
    }
}

//Obtain all items farmacehouse
exports.getAllProductFarmacehouses = async (req, res, next) => {
    try {
        const farmacehouses = await db('casa_farmaceutica').select('*')

        if (farmacehouses.length) {
            return res.status(200).json({
                data: farmacehouses,
                message: 'success'
            })
        }

        return res.status(404).json({
            status: '404',
            message: 'farmacehouses not founded'
        })
    } catch (error) {
        next(error)
    }
}