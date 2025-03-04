//importe de archivo .css
import './InventoryComponent.css'
//importes de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
import Modal from 'react-modal'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import box from '../../assets/img/open-box.png';
import vacio from '../../assets/img/conjunto-vacio.png'
import InventoryItem from '../../Generics/InventoryItem/InventoryItem';
import arrow from '../../assets/img/right-arrow.png'
//import de useState y useNavigate
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoneResults from '../../Generics/NoneResults/NoneResults';

function InventoryComponent() {

    //sección de variables usadas para renderización

    //variable para renderizar el encabezado del contenedor de items
    const titles = ["Nombre comercial", "Componente principal", "Clasificación"
        , "Vencimiento", "Casa farmacéutica", "Unidad", "Precio unitario"
    ]

    //variable que contiene los items a renderizar
    const items = [
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />,
        <InventoryItem name="nombre 1" component="componente 1"
            clasification="ungüento" expiration="N/A" house="san nicolás"
            unit="ml" price="$0.00" />
    ]

    //sección de variables de estado y navegación del componente

    //variable de navegación
    const navigate = useNavigate()
    //variable de estado para el select donde están las clasificaciones
    const [age, setAge] = useState('');

    //variable de estado para el modal para agregar items al inventario
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //variable de estado para el modal que muestra los proveedores
    const [providerModalIsOpen, setProviderModalIsOpen] = useState(false);

    //sección de funciones

    /* función para renderizar los ítems de inventario o la vista
    por defecto en caso de no tener resultados */
    const renderItems = () => {
        if (items.length === 0) {
            return <NoneResults />
        } else {
            return items
        }
    }

    /* función para obtener el valor del select que tiene las clasificaciones 
    de los productos */
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    /* función para el botón de accionar búsqueda */
    const search = () => {
        alert("buscando...")
    }

    /* función para renderizar los títulos del encabezado del contenedor de ítems */
    const renderTitles = () => {
        return titles.map((title) => {
            return <p>{title}</p>
        })
    }

    /* función de navegación a ventana de añadir proveedor */
    const nav = () => {
        navigate("/podocenter/provider/add")
    }

    /* función de navegación a ventana de almacenes y estanterías */
    const stores = () => {
        navigate("/podocenter/stands")
    }

    return (
        <div className='inventoryComponent'>
            <img src={arrow} alt="normal arrow" className='rightArrow' />
            <img src={arrow} alt="normal arrow" className='leftArrow' />
            {/* componente de encabezado */}
            <HeaderGeneric username="@username" route="/podocenter/home">Inventory</HeaderGeneric>
            {/* bloque donde está el menú para filtros y el contenedor de ítems */}
            <div className='inventoryContainer'>
                {/* bloque de búsqueda para filtrar items de inventario*/}
                <section className='filterSection'>
                    <p>Filtrar por...</p>
                    <div className='filters'>
                        <TextField id="standard-basic" label="Nombre comercial" variant="standard" />
                        <TextField id="standard-basic" label="Componente principal" variant="standard" />
                        <TextField id="standard-basic" label="Componente secundario" variant="standard" />
                        {/* select para filtrar por clasificación los ítems de inventario */}
                        <FormControl sx={{ width: "200px" }}>
                            <InputLabel id="demo-simple-select-label">Clasificación</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Clasificación"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Medicamento</MenuItem>
                                <MenuItem value={20}>Insumo</MenuItem>
                                <MenuItem value={30}>Muestra sin valor</MenuItem>
                            </Select>
                        </FormControl>
                        {/* select para filtrar por presentación los ítems de inventario */}
                        <FormControl sx={{ width: "200px" }}>
                            <InputLabel id="demo-simple-select-label">Presentación</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Presentación"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Grageas</MenuItem>
                                <MenuItem value={2}>Pomada</MenuItem>
                                <MenuItem value={3}>Gel</MenuItem>
                                <MenuItem value={4}>Líquido</MenuItem>
                                <MenuItem value={5}>Pastilla</MenuItem>
                                <MenuItem value={6}>Suspensión</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Input de fecha de vencimiento */}
                        <article className='inputDate'>
                            <InputLabel id="demo-simple-select-label">Vencimiento</InputLabel>
                            <TextField id="standard-basic" variant="standard" type='date' />
                        </article>
                        {/* select para filtrar por unidad los ítems de inventario */}
                        <FormControl sx={{ width: "200px" }}>
                            <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Unidad"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>unidad</MenuItem>
                                <MenuItem value={2}>ml</MenuItem>
                                <MenuItem value={3}>gr</MenuItem>
                                <MenuItem value={4}>metro</MenuItem>
                                <MenuItem value={5}>yarda</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="standard-basic" label="Casa farmacéutica" variant="standard" />
                        {/* botón para realizar búsqueda */}
                        <GeneralButton event={search}>Buscar</GeneralButton>
                    </div>
                </section>
                {/* bloque para renderizar ítems encontrados */}
                <section className='itemsContainer'>
                    {/* encabezado del contenedor de renderizado */}
                    <div className='itemsContainerHeader'>
                        {renderTitles()}
                    </div>
                    {/* elementos renderizados */}
                    <div className='itemsContainerElements'>
                        {renderItems()}
                    </div>
                    {/* botones para agregar items */}
                    <div className='itemsContainerFooter'>
                        <GeneralButton event={() => setModalIsOpen(true)}>Nuevo ítem</GeneralButton>
                        <GeneralButton event={() => setProviderModalIsOpen(true)}>Proveedores</GeneralButton>
                        <GeneralButton event={stores}>Almacenes</GeneralButton>
                    </div>
                </section>
                {/* sección de modales a usar */}
                {/* modal para agregar un nuevo ítem al inventario */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Agregar ítem"
                    style={{
                        content: {
                            width: '900px',
                            margin: 'auto',
                            padding: '0',
                        }
                    }}
                >
                    <div className='modalDiv'>
                        <h2 className='titleModal'>Agregar ítem a inventario</h2>
                    </div>
                    <form className='modalForm'>
                        {/* primer bloque de inputs */}
                        <section className='firstBlock'>
                            <TextField id="standard-basic" label="Nombre comercial" variant="standard" sx={{ width: "48%" }} />
                            <TextField id="standard-basic" label="Componente principal" variant="standard" sx={{ width: "48%" }} />
                            <TextField id="standard-basic" label="Componente secundario" variant="standard" sx={{ width: "48%" }} />
                        </section>
                        {/* segundo bloque de inputs */}
                        <section className='secondBlock'>
                            {/* select para filtrar por clasificación los ítems de inventario */}
                            <FormControl sx={{ width: "48%" }}>
                                <InputLabel id="demo-simple-select-label">Clasificación</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Clasificación"
                                    onChange={handleChange}

                                >
                                    <MenuItem value={10}>Medicamento</MenuItem>
                                    <MenuItem value={20}>Insumo</MenuItem>
                                    <MenuItem value={30}>Muestra sin valor</MenuItem>
                                </Select>
                            </FormControl>
                            {/* select para filtrar por presentación los ítems de inventario */}
                            <FormControl sx={{ width: "48%" }}>
                                <InputLabel id="demo-simple-select-label">Presentación</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Presentación"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Grageas</MenuItem>
                                    <MenuItem value={2}>Pomada</MenuItem>
                                    <MenuItem value={3}>Gel</MenuItem>
                                    <MenuItem value={4}>Líquido</MenuItem>
                                    <MenuItem value={5}>Pastilla</MenuItem>
                                    <MenuItem value={6}>Suspensión</MenuItem>
                                </Select>
                            </FormControl>
                        </section>
                        {/* tercer bloque de inputs */}
                        <div className='stateAndBlock'>
                            <section className='thirdBlock'>
                                <TextField id="standard-basic" label="Lote" variant="standard" fullWidth />
                                {/* Input de fecha de vencimiento */}
                                <article className='inputDate'>
                                    <InputLabel id="demo-simple-select-label">Vencimiento</InputLabel>
                                    <TextField fullWidth id="standard-basic" variant="standard" type='date' />
                                </article>
                                {/* select para filtrar por unidad los ítems de inventario */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Unidad"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>unidad</MenuItem>
                                        <MenuItem value={2}>ml</MenuItem>
                                        <MenuItem value={3}>gr</MenuItem>
                                        <MenuItem value={4}>metro</MenuItem>
                                        <MenuItem value={5}>yarda</MenuItem>
                                    </Select>
                                </FormControl>
                            </section>
                            {/* bloque donde se mostrará el estado del ítem en inventario */}
                            <section className='stateSection'>
                                <article>
                                    <img src={box} alt="box" />
                                    <p>Estado</p>
                                </article>
                                <article>
                                    <img src={vacio} alt="vacío" />
                                    <p>N/A</p>
                                </article>
                            </section>
                        </div>
                        {/* cuarto y último bloque de inputs */}
                        <section className='fourthBlock'>
                            {/* input para añadir casa farmacéutica */}
                            <TextField id="standard-basic" label="Casa farmacéutica" variant="standard" sx={{ width: "48%" }} />
                            {/* input para añadir precio unitario */}
                            <TextField id="standard-basic" label="Precio unitario" variant="standard" sx={{ width: "48%" }} />
                            {/* input para añadir cuenta de cargo */}
                            <TextField id="standard-basic" label="Cuenta de cargo" variant="standard" sx={{ width: "48%" }} />
                            {/* input para añadir cuenta de abono */}
                            <TextField id="standard-basic" label="Cuenta de abono" variant="standard" sx={{ width: "48%" }} />
                            {/* sección de botones para cerrar el modal */}
                        </section>
                        <div className='itemsContainerFooter'>
                            <GeneralButton event={() => setModalIsOpen(false)}>Añadir</GeneralButton>
                            <GeneralButton event={() => setModalIsOpen(false)}>Cancelar</GeneralButton>
                        </div>
                    </form>
                </Modal>
                {/* modal para ver la lista de proveedores disponibles */}
                <Modal
                    isOpen={providerModalIsOpen}
                    onRequestClose={() => setProviderModalIsOpen(false)}
                    contentLabel="Lista de proveedores"
                    style={{
                        content: {
                            width: '700px',
                            margin: 'auto',
                            padding: '0',
                        }
                    }}
                >
                    <div className='modalDiv'>
                        <h2 className='titleModal'>Lista de proveedores</h2>
                    </div>
                    <form className='modalForm'>
                        {/* sección de árbol donde se mostrarán los proveedores */}
                        <div className='treeDiv'>
                            <SimpleTreeView>
                                <TreeItem itemId="grid" label="Proveedor 1">
                                    <TreeItem itemId="grid-community" label="Nombre proveedor: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-pro" label="Dirección legal: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-premium" label="Dirección sucursal: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-community2" label="Contacto: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-pro2" label="Contacto local: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-premium2" label="Contacto móvil: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-community3" label="Correos: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-pro3" label="Representante legal: lorem ipsum dolor" />
                                    <TreeItem itemId="grid-premium3" label="NIT: 0000-0000-0000" />
                                </TreeItem>
                                <TreeItem itemId="grid2" label="Proveedor 2">
                                    <TreeItem itemId="rid-community" label="Nombre proveedor: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-pro" label="Dirección legal: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-premium" label="Dirección sucursal: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-community2" label="Contacto: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-pro2" label="Contacto local: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-premium2" label="Contacto móvil: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-community3" label="Correos: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-pro3" label="Representante legal: lorem ipsum dolor" />
                                    <TreeItem itemId="rid-premium3" label="NIT: 0000-0000-0000" />
                                </TreeItem>
                                <TreeItem itemId="grid#" label="Proveedor 3">
                                    <TreeItem itemId="id-community" label="Nombre proveedor: lorem ipsum dolor" />
                                    <TreeItem itemId="id-pro" label="Dirección legal: lorem ipsum dolor" />
                                    <TreeItem itemId="id-premium" label="Dirección sucursal: lorem ipsum dolor" />
                                    <TreeItem itemId="id-community2" label="Contacto: lorem ipsum dolor" />
                                    <TreeItem itemId="id-pro2" label="Contacto local: lorem ipsum dolor" />
                                    <TreeItem itemId="id-premium2" label="Contacto móvil: lorem ipsum dolor" />
                                    <TreeItem itemId="id-community3" label="Correos: lorem ipsum dolor" />
                                    <TreeItem itemId="id-pro3" label="Representante legal: lorem ipsum dolor" />
                                    <TreeItem itemId="id-premium3" label="NIT: 0000-0000-0000" />
                                </TreeItem>
                            </SimpleTreeView>
                        </div>
                        {/* sección de botones */}
                        <div className='itemsContainerFooter'>
                            <GeneralButton event={nav}>Agregar</GeneralButton>
                            <GeneralButton event={() => setProviderModalIsOpen(false)}>Salir</GeneralButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    )
}

export default InventoryComponent