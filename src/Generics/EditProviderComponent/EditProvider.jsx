import './EditProvider.css'
// Importes de componentes o reutilizables
import TextField from '@mui/material/TextField';
import GeneralButton from '../GeneralButton/GeneralButton';
// Import de useState y useNavigate
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProvider, getProviderById, updateProvider } from '../../services/providerService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'

function EditProvider() {

    /* variable para uso de useEffect */
    const { identifier } = useParams();

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const fetchProvider = await getProviderById(identifier)
                setProvider(fetchProvider.data)
            } catch (error) {
                console.error("Error fetching provider: ", error)
            }
        }

        fetchProvider()
    }, [])

    // Sección de variables de estado y navegación del componente
    const [provider, setProvider] = useState({
        nombre_proveedor: '',
        direccion_legal: '',
        direccion_sucursal: '',
        contacto: '',
        contacto_local: '',
        contacto_movil: '',
        correo_1: '',
        correo_2: '',
        representante_legal: '',
        ncr: '',
        nit: ''
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
            await updateProvider(provider.id_proveedor, provider);
            toast.success('Proveedor editado con éxito', {
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

                , 1000);

        } catch (error) {
            console.error('Error editando el proveedor:', error);
            toast.error('Error editando el proveedor', {
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
        <div className='editProviderComponent'>
            <div className='editProviderTitle'>
                <h2>Agregar proveedor</h2>
            </div>
            {/* Formulario con los inputs necesarios para agregar proveedor */}
            <form className='editProviderForm' onSubmit={handleSubmit}>
                <TextField
                    id='standard-basic'
                    label='Nombre proveedor'
                    variant='standard'
                    fullWidth
                    name='nombre_proveedor'
                    value={provider.nombre_proveedor}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección legal'
                    variant='standard'
                    fullWidth
                    name='direccion_legal'
                    value={provider.direccion_legal}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección sucursal'
                    variant='standard'
                    fullWidth
                    name='direccion_sucursal'
                    value={provider.direccion_sucursal}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto'
                    variant='standard'
                    fullWidth
                    name='contacto'
                    value={provider.contacto}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto local'
                    variant='standard'
                    fullWidth
                    name='contacto_local'
                    value={provider.contacto_local}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Contacto móvil'
                    variant='standard'
                    fullWidth
                    name='contacto_movil'
                    value={provider.contacto_movil}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección electrónica 1'
                    variant='standard'
                    fullWidth
                    name='correo_1'
                    value={provider.correo_1}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Dirección electrónica 2'
                    variant='standard'
                    fullWidth
                    name='correo_2'
                    value={provider.correo_2}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Nombre representante legal'
                    variant='standard'
                    fullWidth
                    name='representante_legal'
                    value={provider.representante_legal}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='NCR'
                    variant='standard'
                    fullWidth
                    name='ncr'
                    value={provider.ncr}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='NIT'
                    variant='standard'
                    fullWidth
                    name='nit'
                    value={provider.nit}
                    onChange={handleChange}
                />
                {/* Sección de botones */}
                <div className='editProviderFooter'>
                    <GeneralButton type='submit' event={handleSubmit}>Guardar</GeneralButton>
                    <GeneralButton event={inventory}>Salir</GeneralButton>
                </div>
            </form>
        </div>
    )
}

export default EditProvider