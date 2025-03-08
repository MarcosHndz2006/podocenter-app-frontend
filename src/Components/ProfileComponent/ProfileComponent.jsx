/* importe de archivo .css */
import './ProfileComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import { FaRegUserCircle } from "react-icons/fa";
/* import de useState y useEffect */
import { useState, useEffect } from 'react'
import SpaceCard from '../../Generics/SpaceCard/SpaceCard';
import ServiceCard from '../../Generics/ServiceCard/ServiceCard';
import { getUserById } from '../../services/userServices';
import { getServicesByUserId } from '../../services/serviceService';

function ProfileComponent() {
    const username = localStorage.getItem('username').slice(1, -1);
    const userid = localStorage.getItem('userid');
    /* sección de variables */
    /* variable de estado usada para almacenar los datos del usuario */
    const [user, setUser] = useState(null);

    /* variable de estado usada para renderizar y almacenar los servicios totales */
    const [services, setServices] = useState([]);

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
                                <p><b>Código: </b>{user.idUser}</p>
                                <p><b>Nombre: </b>{user.firstName} {user.lasName}</p>
                                <p><b>Puesto: </b>{user.rolName}</p>
                                <p><b>Unidad de servicio: </b>{user.countSavings}</p>
                                <p><b>Costo por unidad de servicio: </b>{user.countCharge}</p>
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