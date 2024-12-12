//import de archivo .css
import './GeneralButton.css'

function GeneralButton({event, children}){
    return(
        <button onClick={event} className='generalBtn'>{children}</button>
    )
}

export default GeneralButton