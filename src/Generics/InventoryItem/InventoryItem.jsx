//importe de archivo .css
import './InventoryItem.css'
/* importes de componentes o reutilizables */
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import list from '../../assets/img/list.png'
/* importe de useState */
import { useState } from 'react'

function InventoryItem({ name, component, clasification,
    expiration, house, unit, price }) {

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='inventoryItemComponent'>
            <img src={list} alt="botones de despliegue de opciones"
                className='dots' onClick={handleClickOpen} />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Seleccione la opción a ejecutar"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Item {name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Eliminar
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Editar
                    </Button>
                </DialogActions>
            </Dialog>
            <p>{name}</p>
            <p>{component}</p>
            <p>{clasification}</p>
            <p>{expiration}</p>
            <p>{house}</p>
            <p>{unit}</p>
            <p>{price}</p>
        </div>
    )
}

export default InventoryItem