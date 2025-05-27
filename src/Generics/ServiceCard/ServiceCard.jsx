/* import de archivo .css */
import './ServiceCard.css'
/* imports de componentes o reutilizables */
import { GoFileDirectoryFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import Modal from 'react-modal';
import ListItemText from '@mui/material/ListItemText';
import { updateServiceState } from '../../services/serviceService';
import { TiDelete } from "react-icons/ti";
/* import de useState */
import { useState } from 'react'
import GeneralButton from '../GeneralButton/GeneralButton';
import EndComponent from '../EndComponent/EndComponent';
import { useNavigate } from 'react-router-dom'

function ServiceCard({ id, name, description, currentstate, username,
    space, clasification, subclasification, unit, price, event }) {

    /* sección de variables */

    /* variable de navegación */
    const navigate = useNavigate()

    /* variable de estado para mostrar si el servicio ya ha sido
    brindado o no, si ha sido reagendado o cancelado*/
    const [state, setState] = useState(currentstate)

    /* variable de estado para desplegar el modal al hacer click
    sobre el estado del servicio */
    const [open, setOpen] = useState(false);

    /* sección de funciones */

    /* función para renderizar el valor del estado del servicio */
    const serviceState = () => {
        switch (state) {
            case 1: return "next"
            case 2: return "reprogram"
            case 3: return "success"
            case 4: return "cancel"
            default: return ""
        }
    }

    const renderState = () => {
        switch (state) {
            case 1: return "A realizar"
            case 2: return "Reprogramado"
            case 3: return "Finalizado"
            case 4: return "Cancelado"
            default: return ""
        }
    }

    /* función para abrir el modal */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /* función para cerrar el modal */
    const handleClose = () => {
        setOpen(false);
    };

    /* función para cambiar el estado a reprogramado */
    const reprogram = async () => {
        try {
            await updateServiceState(id, 2);
            setState(2);
            handleClose();
        } catch (error) {
            console.error('Error updating service state:', error);
        }
    }

    /* función para cambiar el estado a finalizado */
    const close = async () => {
        try {
            await updateServiceState(id, 3);
            setState(3);
            handleClose();
        } catch (error) {
            console.error('Error updating service state:', error);
        }
    }

    /* función para cambiar el estado a cancelado */
    const cancel = async () => {
        try {
            await updateServiceState(id, 4);
            setState(4);
            handleClose();
        } catch (error) {
            console.error('Error updating service state:', error);
        }
    }

    /* función para confirmar la eliminación del servicio */
    const handleDelete = () => {
        event(id)
    }

    /* función para redireccionar a la edición de servicio */
    const editService = (identifier) => {
        navigate(`/podocenter/service/edit/${identifier}`)
    }

    return (
        <div className={`serviceCardComponent ${serviceState()}`}>
            <TiDelete className='serviceDeleteBtn' onClick={handleDelete} />
            <GoFileDirectoryFill className='dirIcon' onClick={() => { setOpen(true) }} />
            <section className='contentSection'>
                {(state == 3 || state == 4) ? '' : <div className='serviceCardBtns'>
                    <button onClick={reprogram}>Reprogramar</button>
                    <button onClick={close}>Finalizar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>}
                <p>{name}</p>
                <p>{description}</p>
                <p>{serviceState()}</p>
            </section>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                contentLabel='Vista detallada de servicio'
                style={{
                    content: {
                        width: '600px',
                        margin: 'auto',
                        padding: '0'
                    }
                }}
            >
                <div className='modalDiv'>
                    <h2 className='titleModal'>Servicio {name}</h2>
                </div>
                <form className='modalForm'>
                    <section className='userAssignedInfo'>
                        <FaCircleUser className='userIconId' />
                        <article>
                            <p>Encargado</p>
                            <p>{username}</p>
                        </article>
                    </section>
                    <ListItemText primary={`Espacio a utilizar: ${space}`} />
                    <ListItemText primary={`Clasificación del servicio: ${clasification}`} />
                    <ListItemText primary={`Subclasificación del servicio: ${subclasification}`} />
                    <ListItemText primary={`Unidad de operación: ${unit}`} />
                    <ListItemText primary={`Precio unitario: ${price}`} />
                    <ListItemText primary={`Estado actual del servicio: ${renderState()}`} />
                </form>
                <div className='btnsFooter'>
                    <GeneralButton event={() => { editService(id) }}>Editar</GeneralButton>
                </div>
                <EndComponent />
            </Modal>
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Desea modificar el servicio?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Seleccione una opción
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={reprogram}>Reprogramar</Button>
                    <Button onClick={close}>
                        Finalizar
                    </Button>
                    <Button onClick={cancel}>Cancelar</Button>
                </DialogActions>
            </Dialog> */}
        </div>
    )
}

export default ServiceCard