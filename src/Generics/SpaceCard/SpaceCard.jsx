/* import de archivo .css */
import './SpaceCard.css'
/* imports de componentes o reutilizables */
import Modal from 'react-modal'
/* import de useState */
import { useState } from 'react'
import { updateSpaceState } from '../../services/spacesService';
import EndComponent from '../EndComponent/EndComponent';
import GeneralButton from '../GeneralButton/GeneralButton';
import ListItemText from '@mui/material/ListItemText';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function SpaceCard({ id, name, description, currentState, cost, event }) {

    /* sección de variables */

    /* variable de navegación */
    const navigate = useNavigate()

    /* variable de estado usada para mostrar el estado de un espacio */
    const [state, setState] = useState(currentState)

    /* variable de estado usada para abrir el modal */
    const [openSpace, setOpenSpace] = useState(false)

    /* sección de funciones */

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

    /* función para renderizar el estado del espacio */

    const renderState = () => {
        switch (state) {
            case 1: return "Libre"
            case 2: return "Ocupado"
            case 3: return "Fuera de servicio"
            default: return ""
        }
    }

    /* función para liberar el espacio */
    const free = async () => {
        setState(1)
        const response = await updateSpaceState(id, 1)
    }

    /* función para reservar el espacio */
    const reserve = async () => {
        setState(2)
        const response = await updateSpaceState(id, 2)
    }

    /* función para inhabilitar el espacio */
    const outService = async () => {
        setState(3)
        const response = await updateSpaceState(id, 3)
        console.log(response)
    }

    /* función para confirmar la eliminación */
    const handleDelete = () => {
        event(id)
    }

    /* función para ir a la pagina de edición de espacio */
    const editSpace = (identifier) => {
        navigate(`/podocenter/space/edit/${identifier}`)
    }

    return (
        <div className={`spaceCardComponent ${spaceState()} `}>
            <TiDelete className='spaceDeleteBtn' onClick={handleDelete} />
            <div className='spaceCardBtns'>
                {(state == 1) ? "" : <button onClick={free}>Liberar</button>}
                {(state == 2) ? "" : <button onClick={reserve}>Reservar</button>}
                {(state == 3) ? "" : <button onClick={outService}>Inhabilitar</button>}
                <button onClick={() => setOpenSpace(true)}>Información</button>
            </div>
            <p>{name}</p>
            <p>{description}</p>
            <p>{spaceState()}</p>
            <Modal
                isOpen={openSpace}
                onRequestClose={() => setOpenSpace(false)}
                contentLabel='Vista detallada de espacio'
                style={{
                    content: {
                        width: '600px',
                        margin: 'auto',
                        padding: '0'
                    }
                }}
            >
                <div className='modalDiv'>
                    <h2 className='titleModal'>Espacio {name}</h2>
                </div>
                <form className='modalForm'>
                    <ListItemText primary={`No. de espacio: ${id}`} />
                    <ListItemText primary={`${description}`} />
                    <ListItemText primary={`Costo por unidad de servicio: ${cost}`} />
                    <ListItemText primary={`Estado actual: ${renderState()}`} />
                </form>
                <div className='btnsFooter'>
                    <GeneralButton event={() => { editSpace(id) }}>Editar</GeneralButton>
                </div>
                <EndComponent />
            </Modal>
        </div>
    )
}

export default SpaceCard