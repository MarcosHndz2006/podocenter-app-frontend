//import del archivo .css
import './StandsComponent.css'
//imports de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import StandCard from '../../Generics/StandCard/StandCard'
import DefaultStore from '../../Generics/DefaultStore/DefaultStore'
import DefaultStand from '../../Generics/DefaultStand/DefaultStand'
import PaginationButton from '../../Generics/PaginationButton/PaginationButton'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton'
//import de useState
import { useState, useEffect } from 'react'

function StandsComponent() {

    //sección de funciones

    /* función para renderizar almacenes */
    const renderStores = () => {
        const element = stores.find(str => (str.id == currentPage) ? str : false)

        return <section className='storesContainer'>
            <h3>{element.name}</h3>
            <section className='standsContainer' id={element.id}>
                {element.stands}
            </section>
        </section>

    }

    /* función utilizada para actualizar el estado de la variable que contiene
    los estantes de cada almacén */

    const addStand = (id) => {
        /* primero se obtiene el elemento que coincide con el almacén que se
        está modificando */
        const element = stores.find(str => (str.id == id) ? str : false)
        console.log(element)

        /* se crea un nuevo elemento para que sustituya al elemento 
        anterior y se guarde en ese almacén */
        const newElement = {
            id: element.id, name: element.name,
            stands: [...element.stands, <StandCard />]
        }
        console.log(newElement)
        /* se setea el arreglo filtrando primero los objetos que no han
        sido modificados y luego se retorna un nuevo arreglo, en base
        al nuevo elemento creado y a los objetos antes filtrados para
        renderizar */
        setStores(stores => {
            return stores.map(str => (str.id == id) ? newElement : str)
            /* const filterStores = stores.filter(str => {
                if (str.id != id) {
                    return str
                }
            })

            return [newElement, ...filterStores] */
        })

    }

    /* función para renderizar los botones de paginación */

    const renderPaginationButtons = () => {
        /* variable que es un arreglo donde se almacenan los 
        botones de paginación a renderizar */
        let buttons = []

        /* bucle utilizado para modificar el arreglo anteriormente
        declarado */
        for (let index = 0; index < stores.length; index++) {
            buttons.push(<PaginationButton identifier={index + 1} event={modifyCurrentPage}
                currentPage={currentPage} />)
        }

        /* retorno del arreglo modificado */
        return buttons
    }

    /* función para modificar la página actual y mostrar el almacén
    en base a la página en la que nos encontramos */

    const modifyCurrentPage = (id) => {
        setCurrentPage(id)
    }



    //sección de variables de estado y navegación del componente

    /* variable de estado usada para almacenar los cuadros de almacenes disponibles
    y renderizar de nuevo */
    const [stores, setStores] = useState([
        { id: 1, name: "Almacén No. 1", stands: [<DefaultStand event={addStand} />, <StandCard />] },
        {
            id: 2, name: "Almacén No. 2", stands: [<DefaultStand event={addStand} />
                , <StandCard />, <StandCard />, <StandCard />
            ]
        },
        {
            id: 3, name: "Almacén No. 3", stands: [<DefaultStand event={addStand} />
                , <StandCard />
            ]
        },
        {
            id: 4, name: "Almacén No. 4", stands: [<DefaultStand event={addStand} />
                , <StandCard />, <StandCard />, <StandCard />
            ]
        },
        {
            id: 5, name: "Almacén No. 5", stands: [<DefaultStand event={addStand} />
                , <StandCard />, <StandCard />
            ]
        },
        {
            id: 6, name: "Almacén No. 6", stands: [<DefaultStand event={addStand} />
                , <StandCard />, <StandCard />, <StandCard />
            ]
        },
    ])

    /* variable de estado usada para guardar la página actual que muestra
    el almacén asociado */
    const [currentPage, setCurrentPage] = useState(1)

    /* variable para mostrar el modal para agregar un almacén */
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className='standsComponent'>
            {/* encabezado del div */}
            <HeaderGeneric username="@username" route="/podocenter/inventory">Stands</HeaderGeneric>
            <div className='standsComponentContainer'>
                {renderStores()}
                <section className='btnsPaginationContainer'>
                    <DefaultStore event={() => {setModalIsOpen(true)}} />
                    <div className='pagesButtons'>
                        {renderPaginationButtons()}
                    </div>
                </section>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Agregar ítem"
                style={{
                    content: {
                        width: '400px',
                        margin: 'auto',
                        padding: '0',
                    }
                }}
            >
                <div className='newProviderTitle'>
                    <h2>Agregar almacén</h2>
                </div>
                {/* formulario con los inputs necesarios para agregar proveedor */}
                <form className='newProviderForm'>
                    <TextField id="standard-basic" label="Nombre" variant="standard" fullWidth />
                    <TextField id="standard-basic" label="Ubicación" variant="standard" fullWidth />
                    <TextField id="standard-basic" label="Etiqueta/s" variant="standard" fullWidth />
                    {/* sección de botones */}
                    <div className='newProviderFooter'>
                        <GeneralButton event={()=>{setModalIsOpen(false)}}>Agregar</GeneralButton>
                        <GeneralButton event={()=>{setModalIsOpen(false)}}>Salir</GeneralButton>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default StandsComponent