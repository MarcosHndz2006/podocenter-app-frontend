/* import de archivo .css */
import './BuysComponent.css'
/* imports de componentes o reutilizables */
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric'
import { useState, useEffect } from 'react';

import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';

import { Pagination } from '@mui/material';

function BuysComponent(){

    const username = localStorage.getItem('username').slice(1, -1)
      /* variable usada para almacenar los items de inventario provientes
      de la api  */
      const [items, setItems] = useState([]);
      // variable de estado para almacenar el valor de la página actual
      const [page, setPage] = useState(1)

    //paginacion 
    const paginationHandle = (e, value) => {
        setPage(value)
    }

  /* función para retornar el tamaño de los botones de paginación */
    const paginationSize = () => {
        return Math.ceil(items.length / 13)
    }


    return(
        <div className='buysComponent'>
            <HeaderGeneric username={username} route="/podocenter/home" >
                Buys
            </HeaderGeneric>

            {/* Contenedor principal de las compras */}
            <div className='buysContainer'>
            {/* sección del menú de filtrado de objetos */}
            <section className='filterSection'>
            <p>Filtrar por...</p>
            <div className='filters'>
                <TextField
                id='standard-basic-comercialName'
                label='Nombre comercial'
                variant='standard'
                name='comercialName'
                //onChange={handleFilterChange}
                />
                <TextField
                id='standard-basic-principalComponent'
                label='Componente principal'
                variant='standard'
                name='principalComponent'
                //onChange={handleFilterChange}
                />
                <TextField
                id='standard-basic-secondaryComponent'
                label='Componente secundario'
                variant='standard'
                name='secondaryComponent'
                //onChange={handleFilterChange}
                />
                <FormControl sx={{ width: '200px' }}>
                <InputLabel id='demo-simple-select-label-clasification'>
                    Clasificación
                </InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    //value={filter.Clasiffication}
                    label='Clasificación'
                    name='Clasiffication'
                    //onChange={handleFilterChange}
                >
                    {
                        //falta algo a renderizar
                    }
                </Select>
                </FormControl>
                <TextField
                id='standard-basic-presentation'
                label='Presentación'
                variant='standard'
                name='Presentation'
                //onChange={handleFilterChange}
                />
                <article className='inputDate'>
                <InputLabel id='demo-simple-select-label-expDate'>
                    Vencimiento
                </InputLabel>
                <TextField
                    id='standard-basic'
                    variant='standard'
                    type='date'
                    name='expDate'
                    //onChange={handleFilterChange}
                />
                </article>
                <FormControl sx={{ width: '200px' }}>
                <InputLabel id='demo-simple-select-label-unit'>Unidad</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    //value={filter.unit}
                    label='Unidad'
                    name='unit'
                    //onChange={handleFilterChange}
                >
                    {
                        //falta algo a renderizar
                    }
                </Select>
                </FormControl>
                <FormControl sx={{ width: '200px' }}>
                <InputLabel id='demo-simple-select-label-farmacehouse'>
                    Casa farmaceutica
                </InputLabel>
                <Select
                    labelId='demo-simple-select-label-farmacehouse'
                    id='demo-simple-select'
                    //value={filter.farmacehouse}
                    label='Casa farmaceutica'
                    name='farmacehouse'
                    //onChange={handleFilterChange}
                >
                    {
                        //falta algo a renderizar
                    }
                </Select>
                </FormControl>
            </div>
            <GeneralButton>Limpiar</GeneralButton>
            </section>        
            {/* sección de productos de Buys */}
            <section className='itemsContainer'>
            <div className='itemsContainerHeader'>{}</div>
            <div className='itemsContainerElements'>{}</div>
            <div className='itemsContainerFooter'>
            <Pagination count={paginationSize()} size="large" onChange={paginationHandle} />
            <GeneralButton >Nuevo ítem</GeneralButton>
            <GeneralButton >Proveedores</GeneralButton>
            <GeneralButton >Almacenes</GeneralButton>
            </div>
            </section>

            


            </div>
        </div>

    )
}

export default BuysComponent