//import de archivo .css
import './EditServiceComponent.css'
//imports de componentes y funciones de react
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GeneralButton from '../GeneralButton/GeneralButton'
import { getServiceById, updateServiceInfo } from '../../services/serviceService'
import { getAllServiceSubclasification, getAllServiceClasifications } from '../../services/serviceService'
import { getAllUsers } from '../../services/userServices'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getAllSpaces } from '../../services/spacesService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditServiceComponent() {

    // variable de navegación

    const navigate = useNavigate()

    /* variable usada para almacenar las clasificaciones vigentes de los 
    servicios */
    const [clasifications, setClasifications] = useState([])

    /* variable usada para almacenar las subclasificaiones vigentes de los
    servicios */
    const [subclasifications, setSubclasifications] = useState([])

    /* variable usada para almacenar a los usuarios disponibles */
    const [users, setUsers] = useState([])

    /* variable usada para almacenar los espacios disponibles  */
    const [spaces, setSpaces] = useState([])

    // variable del parámetro enviado

    const { identifier } = useParams();

    // sección de useEffect

    useEffect(() => {
        const fetchService = async () => {
            const service = await getServiceById(identifier);
            setServiceData({
                nombre_servicio: service.data[0].nombre_servicio,
                unidad_servicio: service.data[0].unidad_servicio,
                precio_unitario: service.data[0].precio_unitario,
                id_espacio: service.data[0].id_espacio,
                id_usuario: service.data[0].id_usuario,
                id_clasificacion: service.data[0].id_clasificacion,
                id_subclasificacion: service.data[0].id_subclasificacion,
                id_estado: service.data[0].id_estado
            })
        }

        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                setUsers(users.data)
            } catch (error) {
                console.error('Error fetching users: ', error)
            }
        }

        const fetchClasifications = async () => {
            try {
                const clasifications = await getAllServiceClasifications()
                setClasifications(clasifications.data.data)
            } catch (error) {
                console.error("Error fetching all service clasifications: ", error)
            }
        }

        const fetchSubclasifications = async () => {
            try {
                const subclasifications = await getAllServiceSubclasification()
                setSubclasifications(subclasifications.data.data)
            } catch (error) {
                console.error("Error fetching all service subclasifications: ", error)
            }
        }

        const fetchSpaces = async () => {
            try {
                const spaces = await getAllSpaces()
                setSpaces(spaces.data)
            } catch (error) {
                console.error("Error fetching spaces: ", error)
            }
        }

        fetchService()
        fetchUsers()
        fetchClasifications()
        fetchSubclasifications()
        fetchSpaces()
    }, [identifier])

    // sección de variables

    /* variable de estado para almacenar la información del servicio */
    const [serviceData, setServiceData] = useState({
        nombre_servicio: '',
        unidad_servicio: '',
        precio_unitario: '',
        id_espacio: '',
        id_usuario: '',
        id_clasificacion: '',
        id_subclasificacion: '',
        id_estado: '',
    })

    // sección de funciones

    /* Función para renderizar las clasificaciones de los servicios */
    const renderClasifications = () => {
        return clasifications.map(clasification => {
            return <MenuItem key={clasification.id_clasificacion}
                value={clasification.id_clasificacion}>
                {clasification.nombre}
            </MenuItem>
        })
    }

    /* Función utilizada para renderizar las subclasificaciones de los servicios */
    const renderSubClasifications = () => {
        return subclasifications.map(subclas => {
            return <MenuItem key={subclas.id_subclasificacion}
                value={subclas.id_subclasificacion}>
                {subclas.nombre_subclasificacion}
            </MenuItem>
        })
    }

    /* función para renderizar la lista de usuarios disponibles */
    const renderUsers = () => {
        let filteredUsers = users.map(user =>
            user.id_rol == 4 ? (
                <MenuItem key={user.id_usuario} value={user.id_usuario}>
                    {`Profesional: ${user.nombres} ${user.apellidos}`}
                </MenuItem>
            ) : null
        );

        return filteredUsers
    }

    const renderSpaces = () => {
        return spaces.filter(space => space.id_estado_espacio == 1)
            .map(space => <MenuItem key={space.id_espacio}
                value={space.id_espacio}>
                {`Espacio No. ${space.id_espacio}: ${space.nombre_espacio}, 
                costo: $${space.costo_unidad_servicio_espacio}`}
            </MenuItem>)
    }

    /* función para enviar los datos para editar el servicio */
    const handleSubmit = async () => {
        try {
            const result = await updateServiceInfo(identifier, serviceData)
            toast.success(`${result}`)
            if (result.length != 0 || result != []) {
                navigate('/podocenter/profile/my')
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        }
    }

    /* funcion de navegación */
    const profile = () => {
        navigate('/podocenter/profile/my')
    }

    /* función para obtener los valores de los campos */
    const handleChange = (e) => {
        const { name, value } = e.target
        setServiceData(service => ({
            ...service,
            [name]: value
        }))
    }

    return (
        <div className='editServiceComponent'>
            <div className='editServiceTitle'>
                <h2>Editar servicio</h2>
            </div>
            {/* Formulario con los inputs necesarios para editar un servicio */}
            <form className='editServiceForm' onSubmit={handleSubmit}>
                <TextField
                    id='standard-basic'
                    label='Nombre servicio'
                    variant='standard'
                    fullWidth
                    name='nombre_servicio'
                    value={serviceData.nombre_servicio}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Unidad de servicio'
                    variant='standard'
                    fullWidth
                    name='unidad_servicio'
                    value={serviceData.unidad_servicio}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Precio unitario'
                    variant='standard'
                    fullWidth
                    name='precio_unitario'
                    value={serviceData.precio_unitario}
                    onChange={handleChange}
                />
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='demo-simple-select-label-clasification-service'>
                        Espacios disponibles
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='espacio'
                        name='id_espacio'
                        onChange={handleChange}
                        value={serviceData.id_espacio}
                    >
                        {
                            renderSpaces()
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='demo-simple-select-label-clasification-service'>
                        Usuarios disponibles
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='espacio'
                        name='id_usuario'
                        onChange={handleChange}
                        value={serviceData.id_usuario}
                    >
                        {
                            renderUsers()
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='demo-simple-select-label-clasification-service'>
                        Clasificacion
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='espacio'
                        name='id_clasificacion'
                        onChange={handleChange}
                        value={serviceData.id_clasificacion}
                    >
                        {
                            renderClasifications()
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='demo-simple-select-label-clasification-service'>
                        Clasificacion
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='espacio'
                        name='id_subclasificacion'
                        onChange={handleChange}
                        value={serviceData.id_subclasificacion}
                    >
                        {
                            renderSubClasifications()
                        }
                    </Select>
                </FormControl>
                <div className='editServiceFooter'>
                    <GeneralButton type='submit' event={handleSubmit}>Guardar</GeneralButton>
                    <GeneralButton event={profile}>Salir</GeneralButton>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default EditServiceComponent