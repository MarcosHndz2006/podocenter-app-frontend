/* import de archivo .css */
import './SpaceCard.css'
/* import de useState */
import { useState } from 'react'

function SpaceCard({ name, description }) {

    /* sección de variables */

    /* variable de estado usada para mostrar el estado de un espacio */
    const [state, setState] = useState(false)

    /* sección de funciones */

    /* función para cambiar el estado del espacio, si está disponible
    o reservado */

    const changeState = () => {
        setState(!state)
    }

    return (
        <div className={`spaceCardComponent ${state ? "occupied" : "free"} `}>
            <p>{name}</p>
            <p>{description}</p>
            <p onClick={changeState}>{state ? "Reservado" : "Disponible"}</p>
        </div>
    )
}

export default SpaceCard