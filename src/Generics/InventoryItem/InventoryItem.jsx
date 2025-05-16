import './InventoryItem.css';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import list from '../../assets/img/list.png';
import Modal from 'react-modal';
import GeneralButton from '../GeneralButton/GeneralButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import box from '../../assets/img/open-box.png';
import vacio from '../../assets/img/conjunto-vacio.png';
import { CiCircleCheck } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import { IoAlertCircleOutline } from "react-icons/io5";
import { deleteInventoryItem, createInventoryItem, updateInventoryItem } from '../../services/inventoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function InventoryItem({ id, name, component, secondaryComponent, clasification,
  Presentation, lot, expDate, house, unit, price, onDelete, units, clasifications,
  farmacehouses, quantity }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    id_producto: id,
    nombre_comercial: name,
    componente_principal: component,
    componente_secundario: secondaryComponent,
    id_clasificacion_producto: clasification,
    presentacion: Presentation,
    lote: lot,
    vencimiento: expDate,
    id_unidad: unit,
    id_casa_farmaceutica: house,
    precio_unitario: price,
    existencias: quantity
  });

  const renderState = () => {
    return (quantity > 20) ? <CiCircleCheck className='checkIcon' /> :
      (quantity <= 20 && quantity > 10) ? <GoAlert className='cautionIcon' /> :
        <IoAlertCircleOutline className='dangerIcon' />
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalIsOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const deleteItem = async () => {
    onDelete(id)
    setOpen(false);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      await updateInventoryItem(newItem);
      toast.success('Item creado con éxito', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setModalIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Error creando el item', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  return (
    <div className='inventoryItemComponent'>
      <img src={list} alt='botones de despliegue de opciones' className='dots' onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => { setOpen(false) }}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{'Seleccione la opción a ejecutar'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Item {name}</DialogContentText>
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
      <p>{secondaryComponent}</p>
      <p>{clasification}</p>
      <p>{expDate}</p>
      <p>{house}</p>
      <p>{unit}</p>
      <p>$ {price}</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel='Editar item'
        style={{
          content: {
            width: '900px',
            margin: 'auto',
            padding: '0'
          }
        }}
      >
        <div className='modalDiv'>
          <h2 className='titleModal'>Editar item </h2>
        </div>
        <form className='modalForm'>
          <section className='firstBlock'>
            <TextField
              id='standard-basic'
              label='Nombre comercial'
              variant='standard'
              sx={{ width: '48%' }}
              name='nombre_comercial'
              value={newItem.nombre_comercial}
              onChange={handleChange}
            />
            <TextField
              id='standard-basic'
              label='Componente principal'
              variant='standard'
              sx={{ width: '48%' }}
              name='componente_principal'
              value={newItem.componente_principal}
              onChange={handleChange}
            />
            <TextField
              id='standard-basic'
              label='Componente secundario'
              variant='standard'
              sx={{ width: '48%' }}
              name='componente_secundario'
              value={newItem.componente_secundario}
              onChange={handleChange}
            />
          </section>
          <section className='secondBlock'>
            <FormControl sx={{ width: '48%' }}>
              <InputLabel id='demo-simple-select-label'>Clasificación</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={newItem.id_clasificacion_producto}
                label='Clasificación'
                name='id_clasificacion_producto'
                onChange={handleChange}
              >
                {
                  clasifications.map(clas => {
                    return <MenuItem key={`${clas.id_clasificacion_producto}`}
                      value={`${clas.id_clasificacion_producto}`}>
                      {clas.nombre_clasificacion_producto}
                    </MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <TextField
              id='standard-basic'
              label='Presentación'
              variant='standard'
              sx={{ width: '48%' }}
              name='presentacion'
              value={newItem.presentacion}
              onChange={handleChange}
            />
          </section>
          <div className='stateAndBlock'>
            <section className='thirdBlock'>
              <TextField
                id='standard-basic'
                label='Lote'
                variant='standard'
                fullWidth
                name='lote'
                value={newItem.lote}
                onChange={handleChange}
              />
              <article className='inputDate'>
                <InputLabel id='demo-simple-select-label'>Vencimiento</InputLabel>
                <TextField
                  fullWidth
                  id='standard-basic'
                  variant='standard'
                  type='date'
                  name='vencimiento'
                  value={newItem.vencimiento}
                  onChange={handleChange}
                />
              </article>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Unidad</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.id_unidad}
                  label='Unidad'
                  name='id_unidad'
                  onChange={handleChange}
                >
                  {
                    units.map(unit => {
                      return <MenuItem key={`${unit.id_unidad}`} value={`${unit.id_unidad}`}>
                        {unit.nombre_unidad}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </section>
            <section className='stateSection'>
              <article>
                <img src={box} alt='box' />
                <p>Estado</p>
              </article>
              <article>
                {renderState()}
                {(quantity > 20) ? <p>Disponibles {quantity}</p> :
                  (quantity > 10 && quantity <= 20) ? <p>Quedan pocas existencias, en total {quantity}</p> :
                    <p>Existencias a punto de acabarse, quedan {quantity}</p>}
              </article>
            </section>
          </div>
          <section className='fourthBlock'>
            <FormControl sx={{ width: '48%' }}>
              <InputLabel id='demo-simple-select-label'>Casa farmaceutica</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={newItem.id_casa_farmaceutica}
                label='Casa farmaceutica'
                name='id_casa_farmaceutica'
                onChange={handleChange}
              >
                {
                  farmacehouses.map((farmacehouse) => {
                    return <MenuItem key={`${farmacehouse.id_casa_farmaceutica}`}
                      value={`${farmacehouse.id_casa_farmaceutica}`} >
                      {farmacehouse.nombre_casa_farmaceutica}
                    </MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <TextField
              id='standard-basic'
              label='Precio unitario'
              variant='standard'
              sx={{ width: '48%' }}
              name='precio_unitario'
              value={newItem.precio_unitario}
              onChange={handleChange}
            />
            <TextField
              id='standard-basic'
              label='Existencias'
              variant='standard'
              sx={{ width: '48%' }}
              name='existencias'
              value={newItem.existencias}
              onChange={handleChange}
            />
          </section>
          <div className='itemsContainerFooter'>
            <GeneralButton event={(e) => updateItem(e)}>Editar</GeneralButton>
            <GeneralButton event={() => setModalIsOpen(false)}>Cancelar</GeneralButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default InventoryItem;