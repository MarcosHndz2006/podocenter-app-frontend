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
import { getAllInventoryItems, createInventoryItem, getClasifications, getUnits, getFarmacehouses } from '../../services/inventoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProviders } from '../../services/providerService';

function InventoryComponent() {

  /* sección de variables */

  const username = localStorage.getItem("username").slice(1, -1);

  const navigate = useNavigate();

  //variables de estado

  /* variable usada para almacenar los items de inventario provientes
  de la api  */
  const [items, setItems] = useState([]);

  /* variable usada para almacenar los proveedores provenientes de la api */
  const [providers, setProviders] = useState([]);
  const [age, setAge] = useState('');

  /* variable usada para abrir el modal para agregar un item de inventario */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /* variable usada para abrir el modal de proveedores  */
  const [providerModalIsOpen, setProviderModalIsOpen] = useState(false);

  /* variable de estado para almacenar los valores de clasificación de
  producto provenientes de la api */
  const [clasifications, setClasifications] = useState([])

  /* variable de estado para almacenar los valores de las unidades de
  producto provenientes de la api */
  const [units, setUnits] = useState([])

  /* variable de estado para almacenar las casas farmaceuticas registradas
  en db */
  const [farmacehouses, setFarmacehouses] = useState([])

  /* variable usada para almacenar y enviar los datos de un nuevo item
  mediante una nueva requesta a la api */
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
    quantity: ''
  });

  /* variable usada para filtrar los items en base a los valores obtenidos
  de los campos del menú de filtros */
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
    price: ''
  });

  /* sección de funciones */

  //función useEffect 
  useEffect(() => {

    //función para obtener los items de inventario
    const fetchItems = async () => {
      try {
        const fetchedItems = await getAllInventoryItems();
        setItems(fetchedItems.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    //función para obtener los proveedores
    const fetchProviders = async () => {
      try {
        const fetchedProviders = await getAllProviders();
        setProviders(fetchedProviders.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    //función para obtener las clasificaciones de los productos de inventario
    const fetchProductClasifications = async () => {
      try {
        const fetchedClasifications = await getClasifications();
        setClasifications(fetchedClasifications.data)
      } catch (error) {
        console.error("Error al obtener clasificaiones: ", error)
      }
    }

    //función para obtener las unidades de los productos de inventario
    const fetchProductUnits = async () => {
      try {
        const fetchedUnits = await getUnits();
        setUnits(fetchedUnits.data)
      } catch (error) {
        console.error("Error al obtener unidades: ", error)
      }
    }

    //función para obtener las casas farmaceuticas de los productos de inventario
    const fetchProductFarmacehouses = async () => {
      try {
        const fetchedFarmacehouses = await getFarmacehouses();
        setFarmacehouses(fetchedFarmacehouses.data)
      } catch (error) {
        console.error("Error al obtener casas farmaceuticas: ", error)
      }
    }

    //llamadas de todas y c/u de las funciones anteriores
    fetchItems();
    fetchProviders();
    fetchProductClasifications();
    fetchProductUnits();
    fetchProductFarmacehouses();
  }, []);

  //funciones CRUD y de filtrado

  /* función para actualizar la variable de estado del filtro en base al
  campo en el que se ingresó un valor */
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    let numericValue = value;

    if (name === 'Clasiffication') {
      numericValue = value === 'analgésico/antipirético' ? 1 : value === 'antidiarréico' ? 2 : '';
    } else if (name === 'farmacehouse') {
      numericValue = value === 'laboratorios suizos - sucursal escalón' ? 1 :
        value === 'farmacia san nicolás - sucursal la gran vía' ? 2 : '';
    } else if (name === 'unit') {
      numericValue = value === 'miligramos (mg)' ? 1 :
        value === 'mililitros (mL)' ? 2 :
          value === 'microgramos (mcg)' ? 3 :
            value === 'gramos (g)' ? 4 : '';
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

  /* función para añadir el nuevo elemento a inventario */
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

  /* variable usada para renderizar los items filtrados
   en base a los valores seleccionados en el filtro*/
  const filteredItems = items.filter((item) => {
    return (
      (filter.comercialName === '' || item.nombre_comercial.toLowerCase().includes(filter.comercialName.toLowerCase())) &&
      (filter.principalComponent === '' || item.componente_principal.toLowerCase().includes(filter.principalComponent.toLowerCase())) &&
      (filter.secondaryComponent === '' || item.componente_secundario.toLowerCase().includes(filter.secondaryComponent.toLowerCase())) &&
      (filter.Clasiffication === '' || item.id_clasificacion_producto === filter.Clasiffication) &&
      (filter.Presentation === '' || item.presentacion === filter.Presentation) &&
      (filter.lot === '' || item.lote.toLowerCase().includes(filter.lot.toLowerCase())) &&
      (filter.expDate === '' || item.vencimiento.includes(filter.expDate)) &&
      (filter.unit === '' || item.id_unidad === filter.unit) &&
      (filter.farmacehouse === '' || item.id_casa_farmaceutica === filter.farmacehouse) &&
      (filter.price === '' || item.precio_unitario.toLowerCase().includes(filter.price.toLowerCase())));
  });

  /* función para eliminar un producto de inventario */
  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  /* función para limpiar los filtros */
  const cleanFilters = () => {
    setFilter({
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
    })
  }

  //funciones de renderización

  /* función para renderizar los productos de inventario */
  const renderItems = () => {
    if (filteredItems.length === 0) {
      return <NoneResults />;
    } else {
      return filteredItems.map((item) => (
        <InventoryItem
          key={`${item.id_producto}`}
          id={item.id_producto}
          name={item.nombre_comercial}
          component={item.componente_principal}
          secondaryComponent={item.componente_secundario}
          clasification={item.nombre_clasificacion_producto}
          Presentation={item.presentacion}
          lot={item.lote}
          expDate={item.vencimiento}
          house={item.nombre_casa_farmaceutica}
          unit={item.nombre_unidad}
          price={item.precio_unitario}
          onDelete={handleDelete}
          units={units}
          clasifications={clasifications}
          farmacehouses={farmacehouses}
          quantity={item.existencias}
        />
      ));
    }
  };

  /* funcion para renderizar los títulos o encabezados del inventario */
  const renderTitles = () => {
    const titles = [
      'Nombre comercial',
      'Componente principal',
      'Componente secundario',
      'Clasificación',
      'Vencimiento',
      'Casa farmacéutica',
      'Unidad',
      'Precio unitario'
    ];
    return titles.map((title, index) => <p key={index}>{title}</p>);
  };

  /* función para renderizar las clasificaciones de los productos de inventario */
  const renderClasifications = () => {
    return clasifications.map((clas) => {
      return <MenuItem key={`${clas.id_clasificacion_producto}`} value={`${clas.nombre_clasificacion_producto}`}>
        {clas.nombre_clasificacion_producto}
      </MenuItem>
    })
  }

  /* función para renderizar las unidades de los productos de inventario */
  const renderUnits = () => {
    return units.map((unit) => {
      return <MenuItem key={`${unit.id_unidad}`} value={`${unit.nombre_unidad}`}>
        {unit.nombre_unidad}
      </MenuItem>
    })
  }

  /* función para renderizar las casas farmaceuticas de los productos de inventario */
  const renderFarmacehouses = () => {
    return farmacehouses.map((farmacehouse) => {
      return <MenuItem key={`${farmacehouse.id_casa_farmaceutica}`}
        value={`${farmacehouse.nombre_casa_farmaceutica}`} >
        {farmacehouse.nombre_casa_farmaceutica}
      </MenuItem>
    })
  }

  //funciones de navegación

  /* función para navegar hacia la vista de agregar proveedor */
  const nav = () => {
    navigate('/podocenter/provider/add');
  };

  /* función para navegar hacia la vista de almacenes */
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
        {/* sección del menú de filtrado de objetos */}
        <section className='filterSection'>
          <p>Filtrar por...</p>
          <div className='filters'>
            <TextField
              id='standard-basic-comercialName'
              label='Nombre comercial'
              variant='standard'
              name='comercialName'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic-principalComponent'
              label='Componente principal'
              variant='standard'
              name='principalComponent'
              onChange={handleFilterChange}
            />
            <TextField
              id='standard-basic-secondaryComponent'
              label='Componente secundario'
              variant='standard'
              name='secondaryComponent'
              onChange={handleFilterChange}
            />
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label-clasification'>
                Clasificación
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.Clasiffication}
                label='Clasificación'
                name='Clasiffication'
                onChange={handleFilterChange}
              >
                {
                  renderClasifications()
                }
              </Select>
            </FormControl>
            <TextField
              id='standard-basic-presentation'
              label='Presentación'
              variant='standard'
              name='Presentation'
              onChange={handleFilterChange}
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
                onChange={handleFilterChange}
              />
            </article>
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id='demo-simple-select-label-unit'>Unidad</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.unit}
                label='Unidad'
                name='unit'
                onChange={handleFilterChange}
              >
                {
                  renderUnits()
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
                value={filter.farmacehouse}
                label='Casa farmaceutica'
                name='farmacehouse'
                onChange={handleFilterChange}
              >
                {
                  renderFarmacehouses()
                }
              </Select>
            </FormControl>
          </div>
          <GeneralButton event={cleanFilters}>Limpiar</GeneralButton>
        </section>
        {/* sección de productos de inventario */}
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
                  {
                    renderClasifications()
                  }
                </Select>
              </FormControl>
              <TextField
                sx={{ width: '48%' }}
                id='standard-basic-presentation'
                label='Presentación'
                variant='standard'
                name='Presentation'
                value={newItem.Presentation}
                onChange={handleNewItemChange}
              />
            </section>
            <div className='stateAndBlock'>
              <section className='thirdBlock'>
                <TextField
                  id='standard-basic'
                  label='Lote'
                  variant='standard'
                  fullWidth
                  name='lot'
                  value={newItem.lote}
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
                    {
                      renderUnits()
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
                  <img src={vacio} alt='vacío' />
                  <p>N/A</p>
                </article>
              </section>
            </div>
            <section className='fourthBlock'>
              <FormControl sx={{ width: '48%' }}>
                <InputLabel id='demo-simple-select-label-unit'>Casa Farmaceutica</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={newItem.farmacehouse}
                  label='Casa farmaceutica'
                  name='farmacehouse'
                  onChange={handleNewItemChange}
                >
                  {
                    renderFarmacehouses()
                  }
                </Select>
              </FormControl>
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
                label='Cantidad'
                variant='standard'
                sx={{ width: '48%' }}
                name='quantity'
                value={newItem.quantity}
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
                  <TreeItem key={provider.id_proveedor} itemId={`provider-${provider.id_proveedor}`} label={provider.nombre_proveedor}>
                    <TreeItem itemId={`provider-${provider.id_proveedor}-name`} label={`Nombre proveedor: ${provider.nombre_proveedor}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-address`} label={`Dirección legal: ${provider.direccion_legal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-branch`} label={`Dirección sucursal: ${provider.direccion_sucursal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-contact`} label={`Contacto: ${provider.contacto}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-localContact`} label={`Contacto local: ${provider.contacto_local}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-mobileContact`} label={`Contacto móvil: ${provider.contacto_movil}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-emails`} label={`Correos: ${provider.correo_1}, ${provider.correo_2 || ''}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-legalRep`} label={`Representante legal: ${provider.representante_legal}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-nit`} label={`NIT: ${provider.nit}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-ncr`} label={`NRC: ${provider.ncr}`} />
                    <TreeItem itemId={`provider-${provider.id_proveedor}-edit`} label="Editar proveedor" className='editProviderBtn'/>
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
      </div>
    </div>
  );
}

export default InventoryComponent;