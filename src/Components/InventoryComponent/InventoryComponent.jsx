import './InventoryComponent.css';
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
import Modal from 'react-modal';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import box from '../../assets/img/open-box.png';
import vacio from '../../assets/img/conjunto-vacio.png';
import InventoryItem from '../../Generics/InventoryItem/InventoryItem';
import arrow from '../../assets/img/right-arrow.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoneResults from '../../Generics/NoneResults/NoneResults';
import { getAllInventoryItems, createInventoryItem } from '../../services/inventoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProviders } from '../../services/providerService';

function InventoryComponent() {
  const username = localStorage.getItem("username").slice(1, -1);

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [providers, setProviders] = useState([]);
  const [age, setAge] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [providerModalIsOpen, setProviderModalIsOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    comercialName: '',
    principalComponent: '',
    secondaryComponent: '',
    Clasiffication: '',
    Presentation: '',
    lot: '',
    expDate: '',
    unit: '',
    farmacehouse: '',
    price: '',
    chargeAccount: '',
    creditAccount: ''
  });

  const [filter, setFilter] = useState({
    comercialName: '',
    principalComponent: '',
    secondaryComponent: '',
    Clasiffication: '',
    Presentation: '',
    lot: '',
    expDate: '',
    unit: '',
    farmacehouse: '',
    price: '',
    chargeAccount: '',
    creditAccount: ''
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getAllInventoryItems();
        setItems(fetchedItems.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    const fetchProviders = async () => {
      try {
        const fetchedProviders = await getAllProviders();
        console.log(fetchedProviders.data);
        setProviders(fetchedProviders.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchItems();
    fetchProviders();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    let numericValue = value;

    if (name === 'Clasiffication') {
      numericValue = value === 'Medicamento' ? 1 : value === 'Insumo' ? 2 : 3;
    } else if (name === 'Presentation') {
      numericValue = value === 'Grageas' ? 1 : value === 'Pomada' ? 2 : value === 'Gel' ? 3 : value === 'Líquido' ? 4 : value === 'Pastilla' ? 5 : 6;
    } else if (name === 'unit') {
      numericValue = value === 'unidad' ? 1 : value === 'ml' ? 2 : value === 'gr' ? 3 : value === 'metro' ? 4 : 5;
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: numericValue
    }));
  };

  const handleNewItemChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const AddItem = async (event) => {
    event.preventDefault();
    console.log(newItem);
    try {
      await createInventoryItem(newItem);
      toast.success('Item agregado correctamente', {
        position: 'top-center'
      });
      setModalIsOpen(false);

/* wait 3 seconds */
      setTimeout(() => {
        /* reload */
        window.location.reload();
      }, 3000);

      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error agregando el item:', error);
      toast.error('Error agregando el item');
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (filter.comercialName === '' || item.comercialName.toLowerCase().includes(filter.comercialName.toLowerCase())) &&
      (filter.principalComponent === '' || item.principalComponent.toLowerCase().includes(filter.principalComponent.toLowerCase())) &&
      (filter.secondaryComponent === '' || item.secondaryComponent.toLowerCase().includes(filter.secondaryComponent.toLowerCase())) &&
      (filter.Clasiffication === '' || item.Clasiffication === filter.Clasiffication) &&
      (filter.Presentation === '' || item.Presentation === filter.Presentation) &&
      (filter.lot === '' || item.lot.toLowerCase().includes(filter.lot.toLowerCase())) &&
      (filter.expDate === '' || item.expDate.includes(filter.expDate)) &&
      (filter.unit === '' || item.unit === filter.unit) &&
      (filter.farmacehouse === '' || item.farmacehouse.toLowerCase().includes(filter.farmacehouse.toLowerCase())) &&
      (filter.price === '' || item.price.toLowerCase().includes(filter.price.toLowerCase())) &&
      (filter.chargeAccount === '' || item.chargeAccount.toLowerCase().includes(filter.chargeAccount.toLowerCase())) &&
      (filter.creditAccount === '' || item.creditAccount.toLowerCase().includes(filter.creditAccount.toLowerCase()))
    );
  });

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const renderItems = () => {
    if (filteredItems.length === 0) {
      return <NoneResults />;
    } else {
      return filteredItems.map((item) => (
        <InventoryItem
          id={item.idItem}
          name={item.comercialName}
          component={item.principalComponent}
          secondaryComponent={item.secondaryComponent}
          clasification={item.Clasiffication}
          Presentation={item.Presentation}
          lot={item.lot}
          expDate={item.expDate}
          house={item.farmacehouse}
          unit={item.unit}
          price={item.price}
          onDelete={handleDelete}
        />
      ));
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const search = () => {
    alert('buscando...');
  };

  const renderTitles = () => {
    const titles = [
      'Nombre comercial',
      'Componente principal',
      'Clasificación',
      'Vencimiento',
      'Casa farmacéutica',
      'Unidad',
      'Precio unitario'
    ];
    return titles.map((title, index) => <p key={index}>{title}</p>);
  };

  const nav = () => {
    navigate('/podocenter/provider/add');
  };

  const stores = () => {
    navigate('/podocenter/stands');
  };

  return (
    <div className='inventoryComponent'>
      <img src={arrow} alt='normal arrow' className='rightArrow' />
      <img src={arrow} alt='normal arrow' className='leftArrow' />
      <HeaderGeneric username={username} route='/podocenter/home'>
        Inventory
      </HeaderGeneric>
      <div className='inventoryContainer'>
        <section className='filterSection'>
          <p>Filtrar por...</p>
          <div className='filters'>
            <TextField
              id='standard-basic'
              label='Nombre comercial'
              variant='standard'
              name='comercialName'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic'
              label='Componente principal'
              variant='standard'
              name='principalComponent'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic'
              label='Componente secundario'
              variant='standard'
              name='secondaryComponent'
              onChange={handleFilterChange}
            />
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label'>Clasificación</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.Clasiffication}
                label='Clasificación'
                name='Clasiffication'
                onChange={handleFilterChange}
              >
                <MenuItem value='Medicamento'>Medicamento</MenuItem>
                <MenuItem value='Insumo'>Insumo</MenuItem>
                <MenuItem value='Muestra sin valor'>Muestra sin valor</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label'>Presentación</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.Presentation}
                label='Presentación'
                name='Presentation'
                onChange={handleFilterChange}
              >
                <MenuItem value='Grageas'>Grageas</MenuItem>
                <MenuItem value='Pomada'>Pomada</MenuItem>
                <MenuItem value='Gel'>Gel</MenuItem>
                <MenuItem value='Líquido'>Líquido</MenuItem>
                <MenuItem value='Pastilla'>Pastilla</MenuItem>
                <MenuItem value='Suspensión'>Suspensión</MenuItem>
              </Select>
            </FormControl>
            <article className='inputDate'>
              <InputLabel id='demo-simple-select-label'>Vencimiento</InputLabel>
              <TextField
                id='standard-basic'
                variant='standard'
                type='date'
                name='expDate'
                onChange={handleFilterChange}
              />
            </article>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label'>Unidad</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.unit}
                label='Unidad'
                name='unit'
                onChange={handleFilterChange}
              >
                <MenuItem value='unidad'>unidad</MenuItem>
                <MenuItem value='ml'>ml</MenuItem>
                <MenuItem value='gr'>gr</MenuItem>
                <MenuItem value='metro'>metro</MenuItem>
                <MenuItem value='yarda'>yarda</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='standard-basic'
              label='Casa farmacéutica'
              variant='standard'
              name='farmacehouse'
              onChange={handleFilterChange}
            />
            {/* <GeneralButton event={search}>Buscar</GeneralButton> */}
          </div>
        </section>
        <section className='itemsContainer'>
          <div className='itemsContainerHeader'>{renderTitles()}</div>
          <div className='itemsContainerElements'>{renderItems()}</div>
          <div className='itemsContainerFooter'>
            <GeneralButton event={() => setModalIsOpen(true)}>Nuevo ítem</GeneralButton>
            <GeneralButton event={() => setProviderModalIsOpen(true)}>Proveedores</GeneralButton>
            <GeneralButton event={stores}>Almacenes</GeneralButton>
          </div>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel='Agregar ítem'
          style={{
            content: {
              width: '900px',
              margin: 'auto',
              padding: '0'
            }
          }}
        >
          <div className='modalDiv'>
            <h2 className='titleModal'>Agregar ítem a inventario</h2>
          </div>
          <form className='modalForm' onSubmit={AddItem}>
            <section className='firstBlock'>
              <TextField
                id='standard-basic'
                label='Nombre comercial'
                variant='standard'
                sx={{ width: '48%' }}
                name='comercialName'
                value={newItem.comercialName}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Componente principal'
                variant='standard'
                sx={{ width: '48%' }}
                name='principalComponent'
                value={newItem.principalComponent}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Componente secundario'
                variant='standard'
                sx={{ width: '48%' }}
                name='secondaryComponent'
                value={newItem.secondaryComponent}
                onChange={handleNewItemChange}
              />
            </section>
            <section className='secondBlock'>
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label'>Clasificación</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.Clasiffication}
                  label='Clasificación'
                  name='Clasiffication'
                  onChange={handleNewItemChange}
                >
                  <MenuItem value={1}>Medicamento</MenuItem>
                  <MenuItem value={2}>Insumo</MenuItem>
                  <MenuItem value={3}>Muestra sin valor</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label'>Presentación</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.Presentation}
                  label='Presentación'
                  name='Presentation'
                  onChange={handleNewItemChange}
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
            <div className='stateAndBlock'>
              <section className='thirdBlock'>
                <TextField
                  id='standard-basic'
                  label='Lote'
                  variant='standard'
                  fullWidth
                  name='lot'
                  value={newItem.lot}
                  onChange={handleNewItemChange}
                />
                <article className='inputDate'>
                  <InputLabel id='demo-simple-select-label'>Vencimiento</InputLabel>
                  <TextField
                    fullWidth
                    id='standard-basic'
                    variant='standard'
                    type='date'
                    name='expDate'
                    value={newItem.expDate}
                    onChange={handleNewItemChange}
                  />
                </article>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Unidad</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={newItem.unit}
                    label='Unidad'
                    name='unit'
                    onChange={handleNewItemChange}
                  >
                    <MenuItem value={1}>unidad</MenuItem>
                    <MenuItem value={2}>ml</MenuItem>
                    <MenuItem value={3}>gr</MenuItem>
                    <MenuItem value={4}>metro</MenuItem>
                    <MenuItem value={5}>yarda</MenuItem>
                  </Select>
                </FormControl>
              </section>
              <section className='stateSection'>
                <article>
                  <img src={box} alt='box' />
                  <p>Estado</p>
                </article>
                <article>
                  <img src={vacio} alt='vacío' />
                  <p>N/A</p>
                </article>
              </section>
            </div>
            <section className='fourthBlock'>
              <TextField
                id='standard-basic'
                label='Casa farmacéutica'
                variant='standard'
                sx={{ width: '48%' }}
                name='farmacehouse'
                value={newItem.farmacehouse}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Precio unitario'
                variant='standard'
                sx={{ width: '48%' }}
                name='price'
                value={newItem.price}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Cuenta de cargo'
                variant='standard'
                sx={{ width: '48%' }}
                name='chargeAccount'
                value={newItem.chargeAccount}
                onChange={handleNewItemChange}
              />
              <TextField
                id='standard-basic'
                label='Cuenta de abono'
                variant='standard'
                sx={{ width: '48%' }}
                name='creditAccount'
                value={newItem.creditAccount}
                onChange={handleNewItemChange}
              />
            </section>
            <div className='itemsContainerFooter'>
              <GeneralButton event={() => AddItem()}>Añadir</GeneralButton>
              <GeneralButton event={() => setModalIsOpen(false)}>Cancelar</GeneralButton>
            </div>
          </form>
        </Modal>
        <Modal
        isOpen={providerModalIsOpen}
        onRequestClose={() => setProviderModalIsOpen(false)}
        contentLabel='Lista de proveedores'
        style={{
          content: {
            width: '700px',
            margin: 'auto',
            padding: '0'
          }
        }}
      >
          <div className='modalDiv'>
            <h2 className='titleModal'>Lista de proveedores</h2>
          </div>
          <form className='modalForm'>
            <div className='treeDiv'>
              <SimpleTreeView>
              {providers.map((provider) => (
                <TreeItem key={provider.idProviders} itemId={`provider-${provider.idProviders}`} label={provider.name}>
                <TreeItem itemId={`provider-${provider.idProviders}-name`} label={`Nombre proveedor: ${provider.name}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-address`} label={`Dirección legal: ${provider.address}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-branch`} label={`Dirección sucursal: ${provider.branch}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-contact`} label={`Contacto: ${provider.contact}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-localContact`} label={`Contacto local: ${provider.localContact}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-mobileContact`} label={`Contacto móvil: ${provider.MovilContact}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-emails`} label={`Correos: ${provider.mainEmail}, ${provider.secondaryEmail}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-legalRep`} label={`Representante legal: ${provider.legalRepresentative}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-nit`} label={`NIT: ${provider.nit}`} />
                <TreeItem itemId={`provider-${provider.idProviders}-ncr`} label={`NRC: ${provider.ncr}`} />
              </TreeItem>
              ))}
            </SimpleTreeView>
                        </div>
                        <div className='itemsContainerFooter'>
                            <GeneralButton event={nav}>Agregar</GeneralButton>
                            <GeneralButton event={() => setProviderModalIsOpen(false)}>Salir</GeneralButton>
                        </div>
                    </form>
                </Modal>
            <ToastContainer />

            </div>
        </div>
    );
}

export default InventoryComponent;