//importe de archivo .css
import './DefaultStore.css'
//importes de componentes o reutilizables
import plus from '../../assets/img/octagono-plus.png'

function DefaultStore({event}){

    //sección de funciones

    /* función para obtener el evento de click sobre el componente*/

    const eventHandler = (e) =>{
        event(e.isTrusted)
    }

    return (
        <div className='defaultStoreComponent' onClick={eventHandler}>
            <img src={plus} alt="añadir"/>
            <p>Añadir banco de almacén</p>
        </div>
    )
}

export default DefaultStore