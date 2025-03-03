/* import de archivo .css */
import './PaginationButton.css'

function PaginationButton({ identifier, event }) {

    /* sección de funciones */

    const eventHandler = (e) => {
        event(e.target.id)
    }

    return (
        <div className='paginationButtonComponent' id={identifier}
            onClick={eventHandler}>
            {identifier}
        </div>
    )
}

export default PaginationButton