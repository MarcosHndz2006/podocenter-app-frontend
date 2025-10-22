import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  getAllInventoryItems, 
  createInventoryItem, 
  deleteInventoryItem,
  getClasifications,
  getUnits,
  getFarmacehouses
} from '../services/inventoryService';
import { getAllProviders, deleteProvider } from '../services/providerService';
import { getAllShelfs } from '../services/shelfService';

export const useInventoryComponent = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username").slice(1, -1);

  // Estados
  const [items, setItems] = useState([]);
  const [providers, setProviders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [providerModalIsOpen, setProviderModalIsOpen] = useState(false);
  const [clasifications, setClasifications] = useState([]);
  const [units, setUnits] = useState([]);
  const [farmacehouses, setFarmacehouses] = useState([]);
  const [shelfs, setShelfs] = useState([]);
  const [page, setPage] = useState(1);

  // Estado para nuevo item
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
    quantity: '',
    shelf: ''
  });

  // Estado para filtros
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

  // useEffect para cargar datos iniciales
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
        setProviders(fetchedProviders.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    const fetchProductClasifications = async () => {
      try {
        const fetchedClasifications = await getClasifications();
        setClasifications(fetchedClasifications.data);
      } catch (error) {
        console.error("Error al obtener clasificaciones: ", error);
      }
    };

    const fetchProductUnits = async () => {
      try {
        const fetchedUnits = await getUnits();
        setUnits(fetchedUnits.data);
      } catch (error) {
        console.error("Error al obtener unidades: ", error);
      }
    };

    const fetchProductFarmacehouses = async () => {
      try {
        const fetchedFarmacehouses = await getFarmacehouses();
        setFarmacehouses(fetchedFarmacehouses.data);
      } catch (error) {
        console.error("Error al obtener casas farmaceuticas: ", error);
      }
    };

    const fetchShelfs = async () => {
      try {
        const fetchedShelfs = await getAllShelfs();
        setShelfs(fetchedShelfs.data);
      } catch (error) {
        console.error("Error fetching shelfs: ", error);
      }
    };

    fetchItems();
    fetchProviders();
    fetchProductClasifications();
    fetchProductUnits();
    fetchProductFarmacehouses();
    fetchShelfs();
  }, []);

  // Funciones de manejo de cambios
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
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  // Funciones CRUD
  const AddItem = async (event) => {
    event.preventDefault();
    try {
      await createInventoryItem(newItem);
      toast.success('Item agregado correctamente', {
        position: 'top-center'
      });
      setModalIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);

      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error agregando el item:', error);
      toast.error('Error agregando el item');
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteInventoryItem(itemId);
      toast.success('Item eliminado con éxito', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const deleteOneProvider = async (idProvider) => {
    try {
      await deleteProvider(idProvider);
      toast.success('Proveedor eliminado con éxito', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting provider: ", error);
    }
  };

  // Función para limpiar filtros
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
    });
  };

  // Funciones de navegación
  const nav = () => {
    navigate('/podocenter/provider/add');
  };

  const stores = () => {
    navigate('/podocenter/stands');
  };

  const editProvider = (identifier) => {
    navigate(`/podocenter/provider/edit/${identifier}`);
  };

  // Funciones de paginación
  const paginationHandle = (e, value) => {
    setPage(value);
  };

  const paginationSize = () => {
    return Math.ceil(filteredItems.length / 13);
  };

  // Items filtrados
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
      (filter.price === '' || item.precio_unitario.toLowerCase().includes(filter.price.toLowerCase()))
    );
  });

  return {
    // Estados
    username,
    items,
    providers,
    modalIsOpen,
    setModalIsOpen,
    providerModalIsOpen,
    setProviderModalIsOpen,
    clasifications,
    units,
    farmacehouses,
    shelfs,
    newItem,
    filter,
    page,
    filteredItems,
    
    // Funciones
    handleFilterChange,
    handleNewItemChange,
    AddItem,
    handleDelete,
    deleteOneProvider,
    cleanFilters,
    nav,
    stores,
    editProvider,
    paginationHandle,
    paginationSize
  };
};