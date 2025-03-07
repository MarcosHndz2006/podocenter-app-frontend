/* import de archivo .css */
import './SpaceOption.css'
/* import de useState */
import { useState } from 'react'

function SpaceOption({ name, description, state }) {

    /* sección de variables */

    /* variable usada para setear el estado del componente */
    const [state, setState] = useState(state)

    /* sección de funciones */

    /* función para asignar un valor en base al estado encontrado */
    const asignState = () => {
        switch (state) {
            case 1: return "free"
            case 2: return "occupied"
            case 2: return "outService"
            default: return ""
        }
    }

    /* función para cambiar el estado */
    const changeState = () => {
        if(state == 1){
            setState(2)
        }
    }

    return (
        <div className={`spaceOptionComponent ${asignState()}`}
            onClick={changeState}>
            <p>{name}</p>
            <p>{description}</p>
            <p>{asignState()}</p>
        </div>
    )
}

export default SpaceOption