//importe de archivo .css
import './DefaultStand.css'
//importe de componentes o reutilizables
import plus from '../../assets/img/octagono-plus.png'

function DefaultStand({event}) {

    //sección de funciones

    /* función para obtener el evento click del componente */
    const eventHandler = (e) => {
        event(e.target.parentElement.id)
    }

    return (
        <div className='defaultStandCard' onClick={eventHandler}>
                <img src={plus} alt="plus"/>
                <p>Añadir estante </p>
        </div>
    )
}

export default DefaultStand