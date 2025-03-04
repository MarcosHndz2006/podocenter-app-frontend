//importe de archivo .css
import './InventoryItem.css'
/* importes de componentes o reutilizables */
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import list from '../../assets/img/list.png'
import Modal from 'react-modal'
import GeneralButton from '../GeneralButton/GeneralButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import box from '../../assets/img/open-box.png'
import vacio from '../../assets/img/conjunto-vacio.png'
/* importe de useState */
import { useState } from 'react'

function InventoryItem({ name, component, clasification,
    expiration, house, unit, price, event }) {

    //sección de variables

    /* variable de estado que se utiliza para abrir el cuadro de diálogo
    para editar o eliminar cada ítem de inventario */
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    /* variable para abrir y cerrar el modal de edición de ítem de 
    inventario */
    const [modalIsOpen, setModalIsOpen] = useState(false)

    //variable de estado para el select donde están las clasificaciones
    const [age, setAge] = useState('');

    //sección de funciones

    /* función para abrir el cuadro de diálogo con el evento click */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /* función para cerrar el cuadro de diálogo */
    const handleClose = () => {
        setOpen(false);
        setModalIsOpen(true)
    };

    /* función para eliminar un ítem de inventario */
    const deleteItem = (e) => {
        console.log(e.target)
        setOpen(false)
    }

    /* función para obtener el valor del select que tiene las clasificaciones 
    de los productos */
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='inventoryItemComponent'>
            <img src={list} alt="botones de despliegue de opciones"
                className='dots' onClick={handleClickOpen} />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Seleccione la opción a ejecutar"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Item {name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={deleteItem}>
                        Eliminar
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Editar
                    </Button>
                </DialogActions>
            </Dialog>
            <p>{name}</p>
            <p>{component}</p>
            <p>{clasification}</p>
            <p>{expiration}</p>
            <p>{house}</p>
            <p>{unit}</p>
            <p>{price}</p>
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
        </div>
    )
}

export default InventoryItem