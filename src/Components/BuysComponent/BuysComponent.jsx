/* import de archivo .css */
import './BuysComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'

function BuysComponent(){

    const username = localStorage.getItem('username').slice(1, -1)

    return(
        <div className='buysComponent'>
            <HeaderGeneric username={username} route="podocenter/home" >
                Buys
            </HeaderGeneric>
        </div>
    )
}

export default BuysComponent