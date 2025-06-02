import './HomeComponent.css'
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import hand from '../../assets/img/seleccione.png'
import NavButtonGeneric from '../../Generics/NavButtonGeneric/NavButtonGeneric'
import inventory from '../../assets/img/inventario.png'
import stocks from '../../assets/img/ahora-disponible.png'
import cobros from '../../assets/img/factura.png'
import logo from '../../assets/img/logo podocenter.png'
import mysoft from '../../assets/img/my soft logo.png'
/* import de useState */
import { useState, useEffect } from 'react'

function HomeComponent() {

    /* constante para extraer el nombre de usuario de quien acaba de iniciar sesión */
    const username = localStorage.getItem('username').slice(1, -1)
    /* constante para identificar el rol de ese usuario que inicio sesión */
    /* Nota: la función slice es para quitar las comillas dobles del valor */
    const [rol, setRol] = useState(localStorage.getItem('rolid'))

    /* variable de estado usada para renderizar los botones en base al rol */
    const [buttons, setButtons] = useState([
        { inventory: '' },
        { stocks: '' },
        { payments: '' },
        { buys: '' }
    ])


    /* sección de funciones */

    useEffect(() => {
        /* función utilizada para renderizar los botones en base al rol
            del usuario que ha iniciado sesión */
        const renderByRol = () => {
            switch (rol) {
                case "1": {
                    setButtons([
                        { inventory: 'activo' },
                        { stocks: 'activo' },
                        { payments: 'activo' },
                        { buys: 'activo' }
                    ])
                    break;
                }
                case "2": {
                    setButtons([
                        { inventory: '' },
                        { stocks: '' },
                        { payments: 'activo' },
                        { buys: '' }
                    ])
                    break;
                }
                case "3": {
                    setButtons([
                        { inventory: '' },
                        { stocks: 'activo' },
                        { payments: 'activo' },
                        { buys: 'activo' }
                    ])
                    break;
                }
                case "4": {
                    setButtons([
                        { inventory: '' },
                        { stocks: 'activo' },
                        { payments: '' },
                        { buys: '' }
                    ])
                    break;
                }
                default: {
                    setButtons([
                        { inventory: '' },
                        { stocks: '' },
                        { payments: '' },
                        { buys: '' }
                    ])
                    break;
                }
            }
        }

        renderByRol()
    }, [])

    return (
        <div className='homeComponent'>
            <HeaderGeneric username={username} route="/podocenter/auth">Home</HeaderGeneric>
            <p>Selecciona una opción para comenzar a navegar</p>
            <img src={hand} alt="" height="30px" width="30px" />
            <section className='menuOptionsContainer1'>
                {buttons[0].inventory && <NavButtonGeneric route="/podocenter/inventory">
                    <img src={inventory} alt="inventario.png" width="150px" height="150px" />
                    <p>Inventario</p>
                </NavButtonGeneric>}
                {buttons[1].stocks && <NavButtonGeneric route="/podocenter/stocks">
                    <img src={stocks} alt="inventario.png" width="150px" height="150px" />
                    <p>Productos</p>
                </NavButtonGeneric>}
            </section>
            <section className='menuOptionsContainer2'>
                {buttons[2].payments && <NavButtonGeneric route="/podocenter/payments">
                    <img src={cobros} alt="inventario.png" width="150px" height="150px" />
                    <p>Cobros</p>
                </NavButtonGeneric>}
                {buttons[3].buys && <NavButtonGeneric route="/podocenter/buys">
                    <img src={cobros} alt="inventario.png" width="150px" height="150px" />
                    <p>Compras</p>
                </NavButtonGeneric>}
                <NavButtonGeneric>
                    <img src={logo} alt="inventario.png" width="150px" height="150px" />
                    <p>PODOCENTER</p>
                </NavButtonGeneric>
            </section>
            <img className="mySoftImg" src={mysoft} alt="my soft logo.png" width="50px" height="50px" />
            <p className='mySoftTitle'>Desarrollado por MySoft</p>
        </div>
    )
}

export default HomeComponent