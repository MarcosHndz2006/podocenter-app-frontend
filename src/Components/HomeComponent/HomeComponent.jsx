import './HomeComponent.css'
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import hand from '../../assets/img/seleccione.png'
import NavButtonGeneric from '../../Generics/NavButtonGeneric/NavButtonGeneric'
import inventory from '../../assets/img/inventario.png'
import stocks from '../../assets/img/ahora-disponible.png'
import cobros from '../../assets/img/factura.png'
import logo from '../../assets/img/logo podocenter.png'
import mysoft from '../../assets/img/my soft logo.png'

function HomeComponent(){
    return(
        <div className='homeComponent'>
            <HeaderGeneric username="@username">Home</HeaderGeneric>
            <p>Selecciona una opción para comenzar a navegar</p>
            <img src={hand} alt="" height="30px" width="30px"/>
            <section className='menuOptionsContainer1'>
                <NavButtonGeneric>
                    <img src={inventory} alt="inventario.png" width="150px" height="150px"/>
                    <p>Inventario</p>
                </NavButtonGeneric>
                <NavButtonGeneric>
                    <img src={stocks} alt="inventario.png" width="150px" height="150px"/>
                    <p>Productos</p>
                </NavButtonGeneric>
            </section>
            <section className='menuOptionsContainer2'>
                <NavButtonGeneric>
                    <img src={cobros} alt="inventario.png" width="150px" height="150px"/>
                    <p>Cobros</p>
                </NavButtonGeneric>
                <NavButtonGeneric>
                    <img src={logo} alt="inventario.png" width="150px" height="150px"/>
                    <p>PODOCENTER</p>
                </NavButtonGeneric>
            </section>
            <img className="mySoftImg" src={mysoft} alt="my soft logo.png" width="50px" height="50px"/>
            <p className='mySoftTitle'>Desarrollado por MySoft</p>
        </div>
    )
}

export default HomeComponent