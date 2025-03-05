/* importe de archivo .css */
import './ProfileComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import { FaRegUserCircle } from "react-icons/fa";
/* import de useState */
import { useState } from 'react'
import SpaceCard from '../../Generics/SpaceCard/SpaceCard';
import ServiceCard from '../../Generics/ServiceCard/ServiceCard';

function ProfileComponent() {

    /* sección de variables */

    /* variable de estado usada para renderizar los espacios disponibles 
    y usados */
    const [spaces, setSpaces] = useState([
        { id: 1, name: "Espacio 1", description: "lorem ipsum dolor" },
        { id: 2, name: "Espacio 2", description: "lorem ipsum dolor" },
        { id: 3, name: "Espacio 3", description: "lorem ipsum dolor" },
        { id: 4, name: "Espacio 4", description: "lorem ipsum dolor" },
        { id: 5, name: "Espacio 5", description: "lorem ipsum dolor" },
        { id: 1, name: "Espacio 1", description: "lorem ipsum dolor" },
        { id: 2, name: "Espacio 2", description: "lorem ipsum dolor" },
        { id: 3, name: "Espacio 3", description: "lorem ipsum dolor" },
        { id: 4, name: "Espacio 4", description: "lorem ipsum dolor" },
        { id: 5, name: "Espacio 5", description: "lorem ipsum dolor" }])

    /* variable de estado usada para renderizar y almacenar
    los servicios totales */
    const [services, setServices] = useState([
        { id: 1, name: "Espacio 1", description: "lorem ipsum dolor" },
        { id: 2, name: "Espacio 2", description: "lorem ipsum dolor" },
        { id: 3, name: "Espacio 3", description: "lorem ipsum dolor" },
        { id: 4, name: "Espacio 4", description: "lorem ipsum dolor" },
        { id: 5, name: "Espacio 5", description: "lorem ipsum dolor" },
        { id: 1, name: "Espacio 1", description: "lorem ipsum dolor" },
        { id: 2, name: "Espacio 2", description: "lorem ipsum dolor" },
        { id: 3, name: "Espacio 3", description: "lorem ipsum dolor" },
    ])

    /* sección de funciones */

    /* función para renderizar los espacios totales */
    const renderSpaces = () => {
        return spaces.map((space) => {
            return <SpaceCard key={space.id} name={space.name}
                description={space.description} />
        })
    }

    /* función para renderizar los servicios totales */
    const renderServices = () => {
        return services.map(service => {
            return <ServiceCard key={service.id}
                name={service.name} description={service.description} />
        })
    }

    return (
        <div className='profileComponent'>
            <HeaderGeneric username="@username" route="/podocenter/home">
                Perfil
            </HeaderGeneric>
            <section className='profileContainer'>
                <div className='basicInformationSection'>
                    <FaRegUserCircle className='userIcon' />
                    <article className='userInformation'>
                        <p><b>Código: </b>100220300</p>
                        <p><b>Nombre: </b>José Antonio Mendéz Pérez</p>
                        <p><b>Puesto: </b>Doctor de Depto. de Cirugía</p>
                        <p><b>Unidad de servicio: </b>unidad/tiempo</p>
                        <p><b>Costo por unidad de servicio: </b>$0.00</p>
                    </article>
                </div>
                <div className='servicesContainer'>
                    <h4>Servicios agendados y soliciados</h4>
                    <div>
                        {renderServices()}
                    </div>
                </div>
                <div className='spacesContainer'>
                    <h4>Espacios usados y disponibles</h4>
                    <div>
                        {renderSpaces()}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileComponent