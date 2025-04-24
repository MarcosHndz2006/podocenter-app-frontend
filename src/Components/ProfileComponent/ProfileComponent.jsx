/* importe de archivo .css */
import './ProfileComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import { FaRegUserCircle } from "react-icons/fa";
import SpaceCard from '../../Generics/SpaceCard/SpaceCard';
import ServiceCard from '../../Generics/ServiceCard/ServiceCard';
import plus from '../../assets/img/octagono-plus.png'
import Modal from 'react-modal';
/* import de useState y useEffect */
import { useState, useEffect } from 'react'
import { getUserById } from '../../services/userServices';
import { getServicesByUserId } from '../../services/serviceService';
import { TextField } from '@mui/material';

function ProfileComponent() {

    /* sección de variables */

    const username = localStorage.getItem('username').slice(1, -1);
    const userid = localStorage.getItem('userid');

    /* variable de estado usada para almacenar los datos del usuario */
    const [user, setUser] = useState(null);

    /* variable de estado para abrir y cerrar el modal para crear un 
    servicio */

    const [modalIsOpen, setModalIsOpen] = useState(false)

    /* variable de estado usada para renderizar y almacenar los servicios totales */
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(userid);
                console.log(userData)
                setUser(userData.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const servicesData = await getServicesByUserId(userid);
                console.log('Services:', servicesData.data);
                setServices(servicesData.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchUserData();
        fetchServices();
    }, [userid]);

    /* sección de funciones */

    /* función para renderizar los servicios totales */
    const renderServices = () => {
        return services.map(service => {
            return <ServiceCard id={service.idService}
                name={service.name} description={service.description} currentstate={service.state} />
        })
    }

    /* función para agregar un nuevo servicio */
    const addService = () => {
        setModalIsOpen(true)
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
                    <section className='defaultService' onClick={addService}>
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
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Unidad de servicio'
                                variant='standard'
                                sx={{ width: '98%' }} />
                            <TextField id='standard-basic'
                                label='Precio unitario ($)'
                                variant='standard'
                                sx={{ width: '98%' }} />
                            <h4>Espacios disponibles</h4>
                            <div className='spacesContainer'>

                            </div>
                        </form>
                    </Modal>
                </div>
                {/*                 <div className='spacesContainer'>
                    <h4>Espacios usados y disponibles</h4>
                    <div>
                        {renderSpaces()}
                    </div>
                </div>
 */}
            </section>
        </div>
    )
}

export default ProfileComponent;