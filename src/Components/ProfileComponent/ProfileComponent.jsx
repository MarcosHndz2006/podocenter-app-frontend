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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '@mui/material';
import EndComponent from '../../Generics/EndComponent/EndComponent';
import { useProfile } from '../../hooks/useProfile';

function ProfileComponent() {

    // Obtener toda la lógica del hook personalizado
    const {
        // Estados
        user,
        username,
        modalIsOpen,
        setModalIsOpen,
        spaceModalIsOpen,
        setSpaceModalIsOpen,
        services,
        spaces,
        clasifications,
        subclasifications,
        users,
        service,
        space,
        
        // Funciones
        handleChange,
        handleChangeSpace,
        addService,
        deleteOneService,
        addSpace,
        deleteOneSpace
    } = useProfile();

    // Funciones de renderizado (estas se mantienen aquí porque son específicas del JSX)
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

    const renderSpaces = () => {
        return spaces.map(space => {
            return <SpaceCard key={space.id_espacio}
                id={space.id_espacio}
                name={space.nombre_espacio}
                description={`Unidad de servicio: ${space.unidad_servicio_espacio}`}
                currentState={space.id_estado_espacio}
                cost={space.costo_unidad_servicio_espacio}
                event={deleteOneSpace}
                rolUser={user?.id_rol}
            />
        })
    }

    const renderClasifications = () => {
        return clasifications.map(clasification => {
            return <MenuItem key={clasification.id_clasificacion}
                value={clasification.id_clasificacion}>
                {clasification.nombre}
            </MenuItem>
        })
    }

    const renderSubClasifications = () => {
        return subclasifications.map(subclas => {
            return <MenuItem key={subclas.id_subclasificacion}
                value={subclas.id_subclasificacion}>
                {subclas.nombre_subclasificacion}
            </MenuItem>
        })
    }

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
                                value={service.nombre_servicio}
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Unidad de servicio'
                                variant='standard'
                                name='unidad_servicio'
                                value={service.unidad_servicio}
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Precio unitario ($)'
                                variant='standard'
                                name='precio_unitario'
                                value={service.precio_unitario}
                                onChange={handleChange}
                                sx={{ width: '98%' }} />
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='demo-simple-select-label-clasification-service'>
                                    Clasificación del servicio
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={service.id_clasificacion}
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
                                    value={service.id_subclasificacion}
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
                                    value={service.id_usuario}
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
                                    value={service.id_espacio}
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
                                value={space.nombre_espacio}
                                onChange={handleChangeSpace}
                                name="nombre_espacio"
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Unidad de servicio de espacio'
                                variant='standard'
                                value={space.unidad_servicio_espacio}
                                onChange={handleChangeSpace}
                                name="unidad_servicio_espacio"
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Precio unitario de espacio($)'
                                variant='standard'
                                value={space.costo_unidad_servicio_espacio}
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