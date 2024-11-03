import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import SearchInput from '../../Generics/SearchInput/SearchInput';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import dayjs from 'dayjs'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import './InventoryComponent.css';
import Modal from 'react-modal'
import ModalSuppliers from 'react-modal'
import AddSupplierModal from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

function InventoryComponent() {

  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSuppliersIsOpen, setModalSuppliersIsOpen] = useState(false);
  const [AddSuppliersIsOpen, setAddSuppliersIsOpen] = useState(false);
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

  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  //función de navegación a almacenes y estanterías
  const toStandsPage = () => {
    navigate("/podocenter/stands")
  }

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
        <div className='modalDiv'>
          <h2 className='titleModal'>Agregar item</h2>
        </div>
        <form className='formModal'>
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
      <p>ítems</p>
      <section className='dataSectionInventory'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <section className='buttonOptions'>
        <button className='generateReportButton'>Generar reporte</button>
        <button className='AddItemButton' onClick={() => setModalIsOpen(true)}>Agregar item</button>
        <button className='suppliersButton' onClick={() => setModalSuppliersIsOpen(true)}>Ver proveedores</button>
      </section>
      <button className='btnStands' onClick={toStandsPage}>Administrar estanterías y almacenes</button>
      <ModalSuppliers
        isOpen={modalSuppliersIsOpen}
        onRequestClose={() => setModalSuppliersIsOpen(false)}
        contentLabel="Lista de proveedores"
        style={{
          content: {
            width: '600px',
            height: '500px',
            margin: 'auto',
            padding: '0',
            fontFamily: "Roboto",
            fontWeight: "light",
          }
        }}
      >
        <div className='modalDiv'>
          <h2 className='titleModal'>Lista de proveedores</h2>
        </div>
        <form className='formModal'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <div className='btns'>
          <button type="button" onClick={() => setAddSuppliersIsOpen(true)} className='btnSave'>Agregar</button>
          <button type="button" onClick={() => setModalSuppliersIsOpen(false)} className='btnCancel'>Cancelar</button>
        </div>
      </ModalSuppliers>
      <AddSupplierModal isOpen={AddSuppliersIsOpen}
        onRequestClose={() => setAddSuppliersIsOpen(false)}
        contentLabel="Agregar proveedor"
        style={{
          content: {
            width: '500px',
            margin: 'auto',
            padding: '0',
            fontFamily: "Roboto",
            fontWeight: "light",
          }
        }}>
        <div className='modalDiv'>
          <h2 className='titleModal'>Agregar proveedor</h2>
        </div>
        <form className='formModal'>
          <TextField fullWidth id="filled-basic" label="Nombre proveedor" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Dirección legal" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Dirección sucursal" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Contacto" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Número de contacto local" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Dirección electrónica 1:" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Dirección electrónica 2:" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="Nombre representante legal" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="NCR" variant="filled" margin="dense" size="small" />
          <TextField fullWidth id="filled-basic" label="NIT" variant="filled" margin="dense" size="small" />
        </form>
        <div className='btns'>
          <button type="button" onClick={saveData} className='btnSave'>Agregar</button>
          <button type="button" onClick={() => setAddSuppliersIsOpen(false)} className='btnCancel'>Cancelar</button>
        </div>
      </AddSupplierModal>
    </div>
  );
}

export default InventoryComponent