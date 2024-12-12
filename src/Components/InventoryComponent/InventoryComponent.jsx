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
//import de useState 
import { useState } from 'react'


function InventoryComponent() {

    //sección de variables de estado del componente

    //variable de estado para el select donde están las clasificaciones
    const [age, setAge] = useState('');

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

    return (
        <div className='inventoryComponent'>
            {/* componente de encabezado */}
            <HeaderGeneric username="@username" route="/podocenter/home">Inventory</HeaderGeneric>
            {/* bloque de búsqueda para filtrar items de inventario*/}
            <section className='filterSection'>
                <p>Filtrar por...</p>
                <div className='filters'>
                    <TextField id="standard-basic" label="Nombre comercial" variant="standard"/>
                    <TextField id="standard-basic" label="Componente principal" variant="standard" />
                    <TextField id="standard-basic" label="Componente secundario" variant="standard" />
                    {/* select para filtrar por clasificación los ítems de inventario */}
                    <FormControl sx={{ width: "200px"}}>
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
        </div>
    )
}

export default InventoryComponent