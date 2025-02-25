//import del archivo .css
import './StandsComponent.css'
//imports de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import StandCard from '../../Generics/StandCard/StandCard'
//import de useState
import { useState } from 'react'
import DefaultStore from '../../Generics/DefaultStore/DefaultStore'

function StandsComponent() {

    //sección de funciones

    /* función utilizada para actualizar el estado de la variable que contiene 
    los cuadros de almacenes disponibles */

    const addStore = (state) => {
        console.log(state)
        setStores((prevStores, index) => [
            ...prevStores,
            <div key={index} className={`storeComponent store-${prevStores.length + 1}`}>
                Almacén No. {prevStores.length}
            </div>
        ])
    }

    //sección de variables de estado y navegación del componente

    /* variable de estado usada para almacenar los cuadros de almacenes disponibles
    y renderizar de nuevo */
    const [stores, setStores] = useState([<DefaultStore event={addStore} />])

    return (
        <div className='standsComponent'>
            {/* encabezado del div */}
            <HeaderGeneric username="@username" route="/podocenter/inventory">Stands</HeaderGeneric>
            <section className='storesContainer'>
                {stores}
            </section>
        </div>
    )
}

export default StandsComponent