/* importe de archivo .css */
import './ProfileComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import { FaRegUserCircle } from "react-icons/fa";
import SpaceCard from '../../Generics/SpaceCard/SpaceCard';
import ServiceCard from '../../Generics/ServiceCard/ServiceCard';
import plus from '../../assets/img/octagono-plus.png'
import Modal from 'react-modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import de useState y useEffect */
import { useState, useEffect } from 'react'
import { getAllUsers, getUserById } from '../../services/userServices';
import { createService, deleteService, getAllServiceClasifications, getAllServices, getAllServiceSubclasification, getServicesByUserId } from '../../services/serviceService';
import { TextField } from '@mui/material';
import { createSpace, deleteSpace, getAllSpaces } from '../../services/spacesService';
import EndComponent from '../../Generics/EndComponent/EndComponent';

function ProfileComponent() {

    /* sección de variables */

    const username = localStorage.getItem('username').slice(1, -1);
    const userid = localStorage.getItem('userid');

    /* variable de estado usada para almacenar los datos del usuario */
    const [user, setUser] = useState(null);

    /* variable de estado para almacenar el servicio que se creará */
    const [service, setService] = useState({
        nombre_servicio: '',
        unidad_servicio: '',
        precio_unitario: '',
        id_usuario: '',
        id_espacio: '',
        id_clasificacion: '',
        id_subclasificacion: ''
    })

    /* variable de estado para abrir y cerrar el modal para crear un 
    servicio */

    const [modalIsOpen, setModalIsOpen] = useState(false)

    /* variable para abrir el modal para añadir un nuevo espacio */
    const [spaceModalIsOpen, setSpaceModalIsOpen] = useState(false)

    /* variable de estado usada para renderizar y almacenar los servicios totales */
    const [services, setServices] = useState([]);

    /* variable de estado usada para almacenar los espacios provenientes
    de la api */
    const [spaces, setSpaces] = useState([])

    /* variable de estado para guardar los valores para crear un nuevo espacio */
    const [space, setSpace] = useState({
        nombre_espacio: '',
        unidad_servicio_espacio: '',
        costo_unidad_servicio_espacio: ''
    })

    /* variable usada para almacenar las clasificaciones vigentes de los 
    servicios */
    const [clasifications, setClasifications] = useState([])

    /* variable usada para almacenar las subclasificaiones vigentes de los
    servicios */
    const [subclasifications, setSubclasifications] = useState([])

    /* variable usada para almacenar a los usuarios disponibles */
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(userid);
                setUser(userData.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchServices = async () => {
            try {
                var servicesData = []
                if (userid == 1) {
                    servicesData = await getAllServices();
                    setServices(servicesData.data.data)
                } else {
                    servicesData = await getServicesByUserId(userid);
                    console.log(servicesData.data)
                    setServices(servicesData.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchSpaces = async () => {
            try {
                const spacesData = await getAllSpaces();
                setSpaces(spacesData.data)
            } catch (error) {
                console.error('Error fetching spaces: ', error)
            }
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

        fetchUserData();
        fetchServices();
        fetchSpaces();
        fetchUsers()
        fetchClasifications()
        fetchSubclasifications()
    }, [userid]);

    /* sección de funciones */

    /* función para renderizar los servicios totales */
    const renderServices = () => {
        return services.map(service => {
            return <ServiceCard key={service.id_servicio}
                id={service.id_servicio}
                name={service.nombre_servicio}
                description={service.nombre_espacio}
                currentstate={service.id_estado}
                username={`${service.nombre_puesto} - ${service.nombres} ${service.apellidos}`}
                space={service.nombre_espacio}
                clasification={service.nombre}
                subclasification={service.nombre_subclasificacion}
                unit={service.unidad_servicio}
                price={service.precio_unitario}
                event={deleteOneService}

            />
        })
    }

    /* función para renderizar los espacios totales */
    const renderSpaces = () => {
        return spaces.map(space => {
            return <SpaceCard key={space.id_espacio}
                id={space.id_espacio}
                name={space.nombre_espacio}
                description={`Unidad de servicio: ${space.unidad_servicio_espacio}`}
                currentState={space.id_estado_espacio}
                cost={space.costo_unidad_servicio_espacio}
                event={deleteOneSpace}
                rolUser={user.id_rol}
            />
        })
    }

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

    const renderFreeSpaces = () => {
        return spaces.filter(space => space.id_estado_espacio == 1)
            .map(space => <MenuItem key={space.id_espacio}
                value={space.id_espacio}>
                {`Espacio No. ${space.id_espacio}: ${space.nombre_espacio}, 
                costo: $${space.costo_unidad_servicio_espacio}`}
            </MenuItem>)
    }

    /* función para agregar un nuevo servicio */
    const addService = async () => {
        const result = await createService(service)
        try {
            toast.success('Servicio añadido con éxito');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(`Error: ${error.response.data.message}`);
        }


    }

    /* función para eliminar un servicio */
    const deleteOneService = async (id) => {
        try {
            const result = await deleteService(id)
            toast.success('Servicio eliminado con éxito');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    }

    /* función para agregar un nuevo espacio */
    const addSpace = async () => {
        const result = await createSpace(space)

        if (result.data.message == "OK") {
            toast.success('Espacio agregado con éxito');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast.error('No se puede agregar el espacio');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    /* función para eliminar un espacio */
    const deleteOneSpace = async (id) => {
        try {
            const result = await deleteSpace(id)
            toast.success('Espacio eliminado con éxito');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(`Error: ${error.response.data.message}`);

        }
    }

    /* función para obtener los valores para crear un nuevo servicio */
    const handleChange = (e) => {
        const { name, value } = e.target
        setService((s) => ({
            ...s,
            [name]: `${value}`
        }))
    }

    /* función para obtener los valores para crear un nuevo espacio */
    const handleChangeSpace = (e) => {
        const { name, value } = e.target
        setSpace((sp) => ({
            ...sp, [name]: `${value}`
        }))
    }

    return (
        <div className='profileComponent'>
            <HeaderGeneric username={username} route="/podocenter/home">
                Perfil
            </HeaderGeneric>
            <section className='profileContainer'>
                <div className='basicInformationSection'>
                    <FaRegUserCircle className='userIcon' />
                    <article className='userInformation'>
                        {user ? (
                            <>
                                <p><b>Código: </b>{user.id_usuario}</p>
                                <p><b>Nombre: </b>{user.nombres} {user.apellidos}</p>
                                <p><b>Puesto: </b>{user.nombre_puesto}</p>
                                <p><b>Unidad de servicio: </b>{user.unidad_servicio}</p>
                                <p><b>Costo por unidad de servicio: </b>$ {user.costo_unidad_servicio}</p>
                            </>
                        ) : (
                            <p>Cargando información del usuario...</p>
                        )}
                    </article>
                </div>
                <div className='servicesContainer'>
                    <h4>Servicios agendados y solicitados</h4>
                    <div>
                        {renderServices()}
                    </div>
                    <section className='defaultService' onClick={() => setModalIsOpen(true)}>
                        <p>Añadir nuevo servicio</p>
                        <img src={plus} alt="plus" />
                    </section>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel='Añadir nuevo servicio'
                        style={{
                            content: {
                                width: '900px',
                                margin: 'auto',
                                padding: '0'
                            }
                        }}
                    >
                        <div className='modalDiv'>
                            <h2 className='titleModal'>Añadir nuevo servicio</h2>
                        </div>
                        <form className='modalForm'>
                            <TextField id='standard-basic'
                                label='Nombre de servicio'
                                variant='standard'
                                name='nombre_servicio'
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Unidad de servicio'
                                variant='standard'
                                name='unidad_servicio'
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Precio unitario ($)'
                                variant='standard'
                                name='precio_unitario'
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='demo-simple-select-label-clasification-service'>
                                    Clasificación del servicio
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Clasificación'
                                    name='id_clasificacion'
                                    onChange={handleChange}
                                >
                                    {
                                        renderClasifications()
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='demo-simple-select-label-subclasification-service'>
                                    Subclasificación del servicio
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Subclasificación'
                                    name='id_subclasificacion'
                                    onChange={handleChange}
                                >
                                    {
                                        renderSubClasifications()
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='demo-simple-select-label-assigned-user'>
                                    Usuario asignado
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Assigned User'
                                    name='id_usuario'
                                    onChange={handleChange}
                                >
                                    {
                                        renderUsers()
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='demo-simple-select-label-free-spaces'>
                                    Espacios disponibles
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Free space'
                                    name='id_espacio'
                                    onChange={handleChange}
                                >
                                    {
                                        renderFreeSpaces()
                                    }
                                </Select>
                            </FormControl>
                            <div className='btnsFooter'>
                                <GeneralButton event={addService}>Crear</GeneralButton>
                                <GeneralButton event={() => setModalIsOpen(false)}>Cancelar</GeneralButton>
                            </div>
                        </form>
                        <EndComponent />
                    </Modal>
                </div>
                {<div className='spacesContainer'>
                    <h4>Espacios usados y disponibles</h4>
                    <div>
                        {renderSpaces()}
                    </div>
                    <section className='defaultService' onClick={() => setSpaceModalIsOpen(true)}>
                        <p>Añadir nuevo espacio</p>
                        <img src={plus} alt="plus" />
                    </section>
                    <Modal
                        isOpen={spaceModalIsOpen}
                        onRequestClose={() => setSpaceModalIsOpen(false)}
                        contentLabel='Añadir nuevo espacio'
                        style={{
                            content: {
                                width: '500px',
                                margin: 'auto',
                                padding: '0'
                            }
                        }}
                    >
                        <div className='modalDiv'>
                            <h2 className='titleModal'>Añadir nuevo espacio</h2>
                        </div>
                        <form className='modalForm'>
                            <TextField id='standard-basic'
                                label='Nombre de espacio'
                                variant='standard'
                                onChange={handleChangeSpace}
                                name="nombre_espacio"
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Unidad de servicio de espacio'
                                variant='standard'
                                onChange={handleChangeSpace}
                                name="unidad_servicio_espacio"
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Precio unitario de espacio($)'
                                variant='standard'
                                name="costo_unidad_servicio_espacio"
                                onChange={handleChangeSpace}
                                sx={{ width: '98%' }} />
                        </form>
                        <div className='btnsFooter'>
                            <GeneralButton event={addSpace}>Crear</GeneralButton>
                            <GeneralButton event={() => setSpaceModalIsOpen(false)}>Cancelar</GeneralButton>
                        </div>
                        <EndComponent />
                    </Modal>
                </div>}
            </section>
            <ToastContainer />
        </div>
    )
}

export default ProfileComponent;