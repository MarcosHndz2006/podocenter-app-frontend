//import de archivo .css
import './GeneralButton.css'

/* Las props de esta función son para obtener todo el contenido que pueda 
colocarse dentro del botón y el evento que se dispara al hacer click sobre 
el botón */
function GeneralButton({event, children}){ 
    return(
        <button onClick={event} className='generalBtn'>{children}</button>
    )
}

export default GeneralButton