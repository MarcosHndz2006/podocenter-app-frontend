//import de archivo .css
import './NewProvider.css'
//importes de componentes o reutilizables
import TextField from '@mui/material/TextField';
import GeneralButton from '../GeneralButton/GeneralButton';
//import de useState y useNavigate
import {useNavigate} from 'react-router-dom'

function NewProvider() {

    //sección de variables de estado y navegación del componente

    //variable de navegación
    const navigate = useNavigate()

    //sección de funciones

    /* función para navegar de regreso a la ventana de inventario */
    const inventory = () => {
        navigate("/podocenter/inventory")
    }

    return (
        /* componente para agregar un nuevo proveedor */
        <div className='newProviderComponent'>
            <div className='newProviderTitle'>
                <h2>Agregar proveedor</h2>
            </div>
            {/* formulario con los inputs necesarios para agregar proveedor */}
            <form className='newProviderForm'>
                <TextField id="standard-basic" label="Nombre proveedor" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Dirección legal" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Contacto" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Contacto local" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Contacto móvil" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Dirección electrónica 1" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Dirección electrónica 2" variant="standard" fullWidth />
                <TextField id="standard-basic" label="Nombre representante legal" variant="standard" fullWidth />
                <TextField id="standard-basic" label="NCR" variant="standard" fullWidth />
                <TextField id="standard-basic" label="NIT" variant="standard" fullWidth />
                {/* sección de botones */}
                <div className='newProviderFooter'>
                    <GeneralButton event={inventory}>Agregar</GeneralButton>
                    <GeneralButton event={inventory}>Salir</GeneralButton>
                </div>
            </form>
        </div>
    )
}

export default NewProvider