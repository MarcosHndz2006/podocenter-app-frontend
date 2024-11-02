import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import SearchInput from '../../Generics/SearchInput/SearchInput';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import dayjs from 'dayjs'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import './InventoryComponent.css';
import Modal from 'react-modal'
import ModalSuppliers from 'react-modal'
import { useState } from 'react'

function InventoryComponent() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSuppliersIsOpen, setModalSuppliersIsOpen] = useState(false);
  const [productData, setProductData] = useState({ name: '', price: '' });
  const [age, setAge] = useState('');
  const [value, setValue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const saveData = () => {
    // Lógica para guardar en la base de datos
    console.log('Saving product:', productData);
    setModalIsOpen(false); // Cierra el popup
  };

  //función para setear el select
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='inventoryComponent'>
      <HeaderGeneric username="@username" route="/podocenter/home">Inventario</HeaderGeneric>
      <SearchInput />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Agregar Producto"
        style={{
          content: {
            width: '500px',
            margin: 'auto',
            padding: '0',
            fontFamily: "Roboto",
            fontWeight: "light",
          }
        }}
      >
        <div style={{
          width: 'auto', padding: '0.5rem', background: '#324D7E',
          flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center'
        }}>
          <h2 style={{ color: 'white', width: 'auto', textAlign: 'center' }}>Agregar item</h2>
        </div>
        <form style={{
          width: 'auto', height: 'auto', display: 'flex', flexFlow: 'column wrap',
          padding: '0.5rem', justifyContent: 'center', alignItems: 'start'
        }}>
          <TextField fullWidth id="filled-basic" label="Nombre comercial" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Componente principal" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Componente secundario" variant="filled" margin="dense" size="small" />
          <FormControl variant="filled" fullWidth margin="dense" size="small" >
            <InputLabel id="demo-simple-select-filled-label">Clasificación</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Medicamento</MenuItem>
              <MenuItem value={20}>Insumo</MenuItem>
              <MenuItem value={30}>Muestra medica sin valor</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" fullWidth margin="dense" size="small" >
            <InputLabel id="demo-simple-select-filled-label">Presentación</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Grageas</MenuItem>
              <MenuItem value={20}>Pomada</MenuItem>
              <MenuItem value={30}>Gel</MenuItem>
              <MenuItem value={20}>Líquido</MenuItem>
              <MenuItem value={20}>Pastilla</MenuItem>
              <MenuItem value={20}>Suspensión</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth id="filled-basic" label="Lote" variant="filled" margin="dense" size="small" />
          <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']} label="Vencimiento">
              <DemoItem label="Vencimiento:">
                <DateField defaultValue={dayjs('2022-04-17')} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <TextField fullWidth id="filled-basic" label="Casa farmaceutica" variant="filled" margin="dense" size="small" />
          <FormControl variant="filled" fullWidth margin="dense" size="small" >
            <InputLabel id="demo-simple-select-filled-label">Unidad</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Unidad</MenuItem>
              <MenuItem value={20}>ml</MenuItem>
              <MenuItem value={30}>gr</MenuItem>
              <MenuItem value={20}>metro</MenuItem>
              <MenuItem value={20}>yarda</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth id="filled-basic" label="Precio unitario" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Cuenta de cargo" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Cuenta de abono" variant="filled" margin="dense" size="small" />
          <div className='btns'>
            <button type="button" onClick={saveData} className='btnSave'>Agregar</button>
            <button type="button" onClick={() => setModalIsOpen(false)} className='btnCancel'>Cancelar</button>
          </div>
        </form>
      </Modal>
      <p>Opciones avanzadas de búsqueda</p>
      <p>Resultados encontrados</p>
      <section className='dataSectionInventory'>

      </section>
      <section className='buttonOptions'>
        <button className='generateReportButton'>Generar reporte</button>
        <button className='AddItemButton' onClick={() => setModalIsOpen(true)}>Agregar item</button>
        <button className='suppliersButton' onClick={() => setModalSuppliersIsOpen(true)}>Ver proveedores</button>
      </section>
      <ModalSuppliers
        isOpen={modalSuppliersIsOpen}
        onRequestClose={() => setModalSuppliersIsOpen(false)}
        contentLabel="Lista de proveedores"
        style={{
          content: {
            width: '600px',
            margin: 'auto',
            padding: '0',
            fontFamily: "Roboto",
            fontWeight: "light",
          }
        }}
      >
        <div style={{
          width: 'auto', padding: '0.5rem', background: '#324D7E',
          flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center'
        }}>
          <h2 style={{ color: 'white', width: 'auto', textAlign: 'center' }}>Lista de proveedores</h2>
        </div>
        <form style={{
          width: 'auto', height: 'auto', display: 'flex', flexFlow: 'column wrap',
          padding: '0.5rem', justifyContent: 'center', alignItems: 'start'}} >

        </form>
        <div className='btns'>
          <button type="button" onClick={saveData} className='btnSave'>Agregar</button>
          <button type="button" onClick={() => setModalSuppliersIsOpen(false)} className='btnCancel'>Cancelar</button>
        </div>
      </ModalSuppliers>
    </div>
  );
}

export default InventoryComponent