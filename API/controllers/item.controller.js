// controllers/item.controller.js
const db = require('../db/connection');

// Get all items
exports.getAllItems = async (req, res, next) => {
    try {

        const itemsToRender = await db('producto')
            .join('casa_farmaceutica', 'producto.id_casa_farmaceutica',
                'casa_farmaceutica.id_casa_farmaceutica')
            .join('clasificacion_producto', 'producto.id_clasificacion_producto',
                'clasificacion_producto.id_clasificacion_producto'
            )
            .join('unidad', 'producto.id_unidad', 'unidad.id_unidad')
            .select('producto.id_producto', 'producto.nombre_comercial', 'producto.componente_principal', 'producto.componente_secundario', 'producto.vencimiento',
                'producto.lote', 'producto.existencias', 'producto.precio_unitario', 'producto.presentacion', 'producto.id_unidad', 'producto.id_estante', 'producto.id_clasificacion_producto',
                'producto.id_casa_farmaceutica', 'casa_farmaceutica.nombre_casa_farmaceutica', 'clasificacion_producto.nombre_clasificacion_producto', 'unidad.nombre_unidad'
            )

        res.status(200).json({
            status: 'success',
            data: itemsToRender
        });

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        })
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
            .where('id_producto', id).select('producto.id_producto', 'producto.nombre_comercial', 'producto.componente_principal', 'producto.componente_secundario', 'producto.vencimiento',
                'producto.lote', 'producto.existencias', 'producto.precio_unitario', 'producto.presentacion', 'producto.id_unidad', 'producto.id_estante', 'producto.id_clasificacion_producto',
                'producto.id_casa_farmaceutica', 'casa_farmaceutica.nombre_casa_farmaceutica', 'clasificacion_producto.nombre_clasificacion_producto', 'unidad.nombre_unidad'
            ).first();

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
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        })
    }
};

// Create a new item
exports.createItem = async (req, res, next) => {
    try {
        const { itemData } = req.body;

        if (!itemData) {
            return res.status(400).json({
                message: 'No ha provisto información correcta para crear un producto, revise la información que intenta almacenar'
            })
        }

        const [id] = await db('producto').insert({
            nombre_comercial: itemData.nombre_comercial,
            componente_principal: itemData.componente_principal,
            componente_secundario: itemData.componente_secundario,
            presentacion: itemData.presentacion,
            precio_unitario: itemData.precio_unitario,
            id_unidad: itemData.id_unidad,
            vencimiento: itemData.vencimiento,
            lote: itemData.lote,
            cuenta_cargo: null,
            id_clasificacion_producto: itemData.id_clasificacion_producto,
            id_casa_farmaceutica: itemData.id_casa_farmaceutica,
            id_estante: itemData.id_estante,
            existencias: itemData.existencias
        });

        const newItem = await db('producto').where('id_producto', id).first();

        if (newItem) {
            return res.status(201).json({
                status: 'success',
                data: newItem
            });
        }
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        })
    }
};

// Update an item
exports.editItem = async (req, res, next) => {
    try {
        const { itemData } = req.body;

        const updated = await db('producto').where('id_producto', itemData.id_producto).update({
            nombre_comercial: itemData.nombre_comercial,
            componente_principal: itemData.componente_principal,
            componente_secundario: itemData.componente_secundario,
            id_clasificacion_producto: itemData.id_clasificacion_producto,
            presentacion: itemData.presentacion,
            lote: itemData.lote,
            vencimiento: itemData.vencimiento,
            id_unidad: itemData.id_unidad,
            id_casa_farmaceutica: itemData.id_casa_farmaceutica,
            precio_unitario: itemData.precio_unitario,
            existencias: itemData.existencias
        });

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Item actualizado con éxito"
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        })
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
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Item eliminado exitosamente'
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        })
    }
};

// Get items by classification
// exports.getItemsByClasification = async (req, res, next) => {
//     try {
//         const { classificationId } = req.params;
//         const items = await db('producto').where('id_clasificacion_producto', classificationId).select('*');

//         res.status(200).json({
//             status: 'success',
//             data: items
//         });
//     } catch (error) {
//         next(error);
//         return res.status(500).json({
//             message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
//         });
//     }
// };

// Get items nearing expiry
// exports.getItemsNearingExpiry = async (req, res, next) => {
//     try {
//         const daysThreshold = req.query.days || 30;
//         const now = new Date();
//         const futureDate = new Date();
//         futureDate.setDate(now.getDate() + parseInt(daysThreshold));

//         const items = await db('producto')
//             .whereBetween('vencimiento', [now.toISOString(), futureDate.toISOString()])
//             .select('*');

//         res.status(200).json({
//             status: 'success',
//             data: items
//         });
//     } catch (error) {
//         next(error);
//         return res.status(500).json({
//             message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
//         });
//     }
// };

//Obtain items clasifications
exports.getAllProductClasifications = async (req, res, next) => {
    try {
        const clasifications = await db('clasificacion_producto').select('*');

        if (clasifications.length != 0) {

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
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        });
    }
}

//Obtain all items units
exports.getAllUnits = async (req, res, next) => {
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
            message: 'Datos de unidades no encontrados'
        })

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        });
    }
}

//Obtain all items id_casa_farmaceutica
exports.getAllFarmacehouses = async (req, res, next) => {
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
            message: 'Datos de casas farmaceuticas no encontrados'
        })

    } catch (error) {
        next(error);
        return res.status(500).json({
            message: `Error interno del servidor: ${error}. Consulte con el equipo de desarrollo`
        });
    }
}