/* import de archivo .css */
import './SpaceCard.css'
/* imports de componentes o reutilizables */
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
/* import de useState */
import { useState } from 'react'

function SpaceCard({ name, description }) {

    /* sección de variables */

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    /* variable de estado usada para mostrar el estado de un espacio */
    const [state, setState] = useState(1)

    /* sección de funciones */

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /* función retornar un valor a la clase en base al estado; si está 
    disponible, reservado o fuera de servicio */

    const spaceState = () => {
        switch (state) {
            case 1: return "free"
            case 2: return "occupied"
            case 3: return "outService"
            default: return ""
        }
    }

    /* función para cambiar el estado del componente */
    const changeState = (newState) => {
        setState(newState)
        openModalSpace(false)
    }

    return (
        <div className={`spaceCardComponent ${spaceState()} `}
            onClick={handleClick}>
            <p>{name}</p>
            <p>{description}</p>
            <p>{spaceState()}</p>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
        </div>
    )
}

export default SpaceCard