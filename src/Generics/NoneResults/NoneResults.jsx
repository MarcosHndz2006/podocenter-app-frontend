//importe de archivo .css
import './NoneResults.css'
//importes de componentes o reutilizables
import logo from '../../assets/img/logo podocenter.png' 

/* componente usado para mostrar la vista por defecto cuando no 
se encuentran resultados de búsqueda */
function NoneResults(){
    return (
        <div className='noneResultsComponent'>
            <p>No se encontraron resultados de búsqueda</p>
            <img src={logo} alt="logo podocenter"/>
            <p>PODOCENTER</p>
        </div>
    )
}

export default NoneResults