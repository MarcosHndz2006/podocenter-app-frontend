// Import de archivo .css
import './NewProvider.css';
// Importes de componentes o reutilizables
import TextField from '@mui/material/TextField';
import GeneralButton from '../GeneralButton/GeneralButton';
// Import de useState y useNavigate
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProvider } from '../../services/providerService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewProvider() {
    // Sección de variables de estado y navegación del componente
    const [provider, setProvider] = useState({
        name: '',
        address: '',
        contact: '',
        localContact: '',
        MovilContact: '',
        mainEmail: '',
        secondaryEmail: '',
        legalRepresentative: '',
        NCR: '',
        NIT: ''
    });

    // Variable de navegación
    const navigate = useNavigate();

    // Función para manejar cambios en los inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProvider((prevProvider) => ({
            ...prevProvider,
            [name]: value
        }));
    };

    // Función para manejar la creación del proveedor
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createProvider(provider);
            toast.success('Proveedor creado con éxito', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            /* wait and navigate */
            setTimeout(() => {
                navigate('/podocenter/inventory');
            }

                , 2000);
                    
        } catch (error) {
            console.error('Error creando el proveedor:', error);
            toast.error('Error creando el proveedor', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    // Función para navegar de regreso a la ventana de inventario
    const inventory = () => {
        navigate('/podocenter/inventory');
    };

    return (
        /* Componente para agregar un nuevo proveedor */
        <div className='newProviderComponent'>
            <ToastContainer />
            <div className='newProviderTitle'>
                <h2>Agregar proveedor</h2>
            </div>
            {/* Formulario con los inputs necesarios para agregar proveedor */}
            <form className='newProviderForm' onSubmit={handleSubmit}>
                <TextField
                    id='standard-basic'
                    label='Nombre proveedor'
                    variant='standard'
                    fullWidth
                    name='name'
                    value={provider.name}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección legal'
                    variant='standard'
                    fullWidth
                    name='address'
                    value={provider.address}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto'
                    variant='standard'
                    fullWidth
                    name='contact'
                    value={provider.contact}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto local'
                    variant='standard'
                    fullWidth
                    name='localContact'
                    value={provider.localContact}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto móvil'
                    variant='standard'
                    fullWidth
                    name='MovilContact'
                    value={provider.MovilContact}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección electrónica 1'
                    variant='standard'
                    fullWidth
                    name='mainEmail'
                    value={provider.mainEmail}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección electrónica 2'
                    variant='standard'
                    fullWidth
                    name='secondaryEmail'
                    value={provider.secondaryEmail}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Nombre representante legal'
                    variant='standard'
                    fullWidth
                    name='legalRepresentative'
                    value={provider.legalRepresentative}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='NCR'
                    variant='standard'
                    fullWidth
                    name='NCR'
                    value={provider.NCR}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='NIT'
                    variant='standard'
                    fullWidth
                    name='NIT'
                    value={provider.NIT}
                    onChange={handleChange}
                />
                {/* Sección de botones */}
                <div className='newProviderFooter'>
                    <GeneralButton type='submit'>Agregar</GeneralButton>
                    <GeneralButton event={inventory}>Salir</GeneralButton>
                </div>
            </form>
        </div>
    );
}

export default NewProvider;