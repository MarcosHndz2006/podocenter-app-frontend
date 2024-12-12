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
//import de useState 
import { useState } from 'react'


function InventoryComponent() {

    //sección de variables usadas para renderización

    //variable para renderizar el encabezado del contenedor de items
    const titles = ["Nombre comercial", "Componente principal", "Clasificación"
        , "Vencimiento", "Casa farmacéutica", "Unidad", "Precio unitario"
    ]

    //sección de variables de estado del componente

    //variable de estado para el select donde están las clasificaciones
    const [age, setAge] = useState('');

    //variable de estado para el modal para agregar items al inventario
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //sección de funciones

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

    return (
        <div className='inventoryComponent'>
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

                    </div>
                    {/* botones para agregar items */}
                    <div className='itemsContainerFooter'>
                        <GeneralButton event={() => setModalIsOpen(true)}>Nuevo ítem</GeneralButton>
                        <GeneralButton>Proveedores</GeneralButton>
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
                            width: '500px',
                            margin: 'auto',
                            padding: '0',
                        }
                    }}
                >
                    <div className='modalDiv'>
                        <h2 className='titleModal'>Agregar item a inventario</h2>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default InventoryComponent