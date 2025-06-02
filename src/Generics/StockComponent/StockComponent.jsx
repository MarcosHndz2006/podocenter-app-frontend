// import de archivo .css
import './StockComponent.css'
// imports de componentes o reutilizables
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import ListItemText from '@mui/material/ListItemText';
import { FaTablets } from "react-icons/fa";
import { FaWineBottle } from "react-icons/fa";

function StockComponent({ props }) {

    /* sección de useEffect */

    useEffect(() => {

    }, [])

    /* sección de variables */

    // variable de estado para controlar el modal que abre la vista detallada

    const [openModal, setOpenModal] = useState(false)

    /* seccíón de funciones */

    /* función para renderizar la disponibilidad en existencias de productos */
    const renderAvailability = () => {
        return (props.existencias == 0) ? 'Producto agotado' :
            (props.existencias < 20) ? 'A punto de agotarse' :
                (props.existencias == 20) ? 'Quedan pocas existencias' :
                    'Existencias suficientes'
    }

    /* función para colocar en gris un producto que no tiene existencias */
    const renderColorAvailability = () => {
        return (props.existencias == 0) ? '#d6d3d3' : ''
    }

    /*  */
    const renderImage = () => {
        switch (props.id_clasificacion_producto) {
            case 1: {
                return <FaTablets className='productIcon' />
            }
            case 2: {
                return <FaWineBottle className='productIcon' />
            }
            default: {
                return ''
            }
        }
    }

    return (
        <div className={`stockComponent`}>
            <Card sx={{ minWidth: 275, background: renderColorAvailability() }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {props.nombre_clasificacion_producto}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.nombre_comercial}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Precio unitario: ${props.precio_unitario}</Typography>
                    <Typography variant="body2">
                        {props.presentacion}
                        <br />
                        {renderAvailability()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setOpenModal(true)}>Leer más</Button>
                </CardActions>
            </Card>
            <Modal isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                contentLabel='Vista detallada de producto'
                style={{
                    content: {
                        width: '500px',
                        margin: 'auto',
                        padding: '0'
                    }
                }}>
                <div className='modalDiv'>
                    <h2 className='titleModal'>Lista de proveedores</h2>
                </div>
                <form className='modalForm'>
                    <article className='productTitleSpace'>
                        {renderImage()}
                        <ListItemText primary={`Clasificacion: ${props.nombre_clasificacion_producto}`} />
                    </article>
                    <ListItemText primary={`Nombre comercial: ${props.nombre_comercial}`} />
                    <ListItemText primary={`Precio unitario: $ ${props.precio_unitario}`} />
                    <ListItemText primary={`Proveedor: ${props.nombre_casa_farmaceutica}`} />
                    <ListItemText primary={`Presentación: ${props.presentacion}`} />
                    <ListItemText primary={`Unidad: ${props.nombre_unidad}`} />
                    <ListItemText primary={`Vencimiento: ${props.vencimiento}`} />
                </form>
            </Modal>
        </div>
    )
}

export default StockComponent