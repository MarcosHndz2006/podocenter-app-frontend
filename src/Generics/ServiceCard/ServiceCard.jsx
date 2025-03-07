/* import de archivo .css */
import './ServiceCard.css'
/* imports de componentes o reutilizables */
import { GoFileDirectoryFill } from "react-icons/go";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/* import de useState */
import { useState } from 'react'

function ServiceCard({ name, description}) {

    /* sección de variables */

    /* variable de estado para mostrar si el servicio ya ha sido
    brindado o no, si ha sido reagendado o cancelado*/
    const [state, setState] = useState(1)

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

    /* función para abrir el modal */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /* función para cerrar el modal */
    const handleClose = () => {
        setOpen(false);
    };

    /* función para cambiar el estado a reprogramado */
    const reprogram = () => {
        setState(2)
        handleClose()
    }

    /* función para cambiar el estado a finalizado */
    const close = () => {
        setState(3)
        handleClose()
    }

    /* función para cambiar el estado a cancelado */
    const cancel = () => {
        setState(4)
        handleClose()
    }

    return (
        <div className={`serviceCardComponent ${serviceState()}`}>
            <GoFileDirectoryFill className='dirIcon' />
            <section className='contentSection'>
                <p>{name}</p>
                <p>{description}</p>
                <p onClick={handleClickOpen}>{serviceState()}</p>
            </section>
            <Dialog
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
            </Dialog>
        </div>
    )
}

export default ServiceCard