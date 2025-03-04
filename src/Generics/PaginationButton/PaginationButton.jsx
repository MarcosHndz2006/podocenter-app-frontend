/* import de archivo .css */
import './PaginationButton.css'
/* import de useState */
import { useState } from 'react'

function PaginationButton({ identifier, event, currentPage }) {

    /* sección de variables */

    /* variable de estado para determinar cuando uno de los bo*/
    const [clicked, setClicked] = useState(false)

    /* sección de funciones */

    const eventHandler = (e) => {
        event(e.target.id)
    }

    /* función para cambiar el fondo del botón de paginación */
    const handleClick = (e) => {
        if (currentPage == identifier){ 
            setClicked(true); // Cambia el estado a 'true' cuando se hace clic
            eventHandler(e); // Ejecuta la función pasada como prop
        }else{
            setClicked(false)
            eventHandler(e); // Ejecuta la función pasada como prop
        }
    };

    return (
        <div className={`paginationButtonComponent ${clicked ? 'clicked' : ''}`} id={identifier}
            onClick={handleClick}>
            {identifier}
        </div>
    )
}

export default PaginationButton