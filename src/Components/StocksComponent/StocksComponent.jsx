import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import './StocksComponent.css'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react'
import { getAllServices } from '../../services/serviceService'
import { getAllInventoryItems } from '../../services/inventoryService'
import StocksContainerComponent from '../StocksContainerComponent/StocksContainerComponent'

function StocksComponent() {

    /* constante para extraer el nombre de usuario de quien acaba de iniciar sesión */
    const username = localStorage.getItem('username').slice(1, -1)
    /* constante para identificar el rol de ese usuario que inicio sesión */
    /* Nota: la función slice es para quitar las comillas dobles del valor */
    /* const [rol, setRol] = useState(localStorage.getItem('rolid')) */

    // variable de estado para almacenar el valor de la página actual
    const [page, setPage] = useState(1)

    /* sección de useEffect */
    useEffect(() => {
        const fetchServices = async () => {
            const services = await getAllServices()
            setServices(services.data.data)
        }

        const fetchProducts = async () => {
            const products = await getAllInventoryItems()
            setProducts(products.data)
        }

        fetchServices()
        fetchProducts()
    }, [page])

    /* sección de variables */

    // variable de estado para almacenar los servicios encontrados
    const [services, setServices] = useState([])

    // variable de estado para almacenar los productos encontrados
    const [products, setProducts] = useState([])

    /* función para obtener los valores de paginación */
    const paginationHandle = (e, value) => {
        setPage(value)
    }

    /* función de renderizado condicional */
    const conditionalRender = () => {
        switch (page) {
            case 1: {
                return <StocksContainerComponent stocks={products} />
            }
            case 2: {
                return <StocksContainerComponent stocks={services} />
            }
            default: {
                return <div>No hay contenido disponible</div>
            }
        }
    }

    /* función para renderizar título */
    const titleRender = () => {
        switch (page) {
            case 1: {
                return "Productos"
            }
            case 2: {
                return "Servicios"
            }
        }
    }

    return (
        <div className='stocksComponent'>
            <HeaderGeneric username={username} route='/podocenter/inventory'>
                {titleRender()}
            </HeaderGeneric>
            <section className='stocksContainer'>
                {conditionalRender()}
            </section>
            <section className='footerStocks'>
                <Pagination count={2} size="large" onChange={paginationHandle} />
            </section>
        </div>
    )
}

export default StocksComponent