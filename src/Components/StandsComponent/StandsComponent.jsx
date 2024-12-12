//import del archivo .css
import './StandsComponent.css'
//imports de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'

function StandsComponent(){
    return(
        <div className='standsComponent'>
            {/* encabezado del div */}
            <HeaderGeneric username="@username" route="/podocenter/inventory">Stands</HeaderGeneric>            
        </div>
    )
}

export default StandsComponent