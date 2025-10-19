// Import del archivo .css
import './StandsComponent.css';
// Imports de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import StandCard from '../../Generics/StandCard/StandCard';
import DefaultStore from '../../Generics/DefaultStore/DefaultStore';
import DefaultStand from '../../Generics/DefaultStand/DefaultStand';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TiDelete } from "react-icons/ti";
// Import de useState y useEffect
import { useState, useEffect } from 'react';
import { createStore, deleteStore, getAllStores } from '../../services/storeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createShelf, deleteShelf } from '../../services/shelfService';
import Pagination from '@mui/material/Pagination';

function StandsComponent() {
  const username = localStorage.getItem('username').slice(1, -1);

  // Sección de variables de estado y navegación del componente
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalStandOpen, setModalStandOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    nombre_almacen: '',
    ubicacion: '',
    etiquetas: '',
    lleno: 0
  });

  const [shelfs, setShelfs] = useState([])

  const [newShelf, setNewShelf] = useState({
    nombre_estante: '',
    niveles: '',
    divisiones: '',
    etiquetas: null,
    lleno: '0',
    id_almacen: ''
  })

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const fetchedStores = await getAllStores();
        setStores(fetchedStores)
        const shelfsList = fetchedStores.map(str => { return str.shelfs })
        setShelfs(shelfsList)
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, [currentPage]);

  // Función para manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: value
    }));
  };

  // Función para agregar valores al nuevo estante
  const handleShelfChange = (e) => {
    const { name, value } = e.target
    setNewShelf(shelf => ({
      ...shelf,
      [name]: value
    }))
  }

  // Función para agregar un nuevo almacén
  const handleAddStore = async (event) => {
    event.preventDefault();
    try {
      const createdStore = await createStore(newStore);
      setStores((prevStores) => [
        ...prevStores,
        { id_almacen: createdStore.id_almacen, nombre_almacen: createdStore.nombre_almacen, stands: [] }
      ]);
      toast.success('Almacén creado con éxito', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setModalIsOpen(false);
      
      // Resetear formulario
      setNewStore({
        nombre_almacen: '',
        ubicacion: '',
        etiquetas: '',
        lleno: 0
      });
    } catch (error) {
      console.error('Error creando el almacén:', error);
      toast.error('Error creando el almacén', {
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

  // Función utilizada para actualizar el estado de la variable que contiene los estantes de cada almacén
  const addStand = async () => {
    try {
      await createShelf(newShelf);
      toast.success('Estante agregado correctamente', {
        position: 'top-center'
      });
      setModalStandOpen(false);

      // En lugar de recargar, actualiza los datos
      const fetchedStores = await getAllStores();
      setStores(fetchedStores);
      const shelfsList = fetchedStores.map(str => { return str.shelfs });
      setShelfs(shelfsList);

      // Resetear formulario
      setNewShelf({
        nombre_estante: '',
        niveles: '',
        divisiones: '',
        etiquetas: null,
        lleno: '0',
        id_almacen: ''
      });
    } catch (error) {
      console.error('Error agregando el estante:', error);
      toast.error('Error agregando el estante');
    }
  }

  /* Función para eliminar un almacén */
  const deleteStorage = async (id) => {
    try {
      await deleteStore(id);
      toast.success('Almacen eliminado correctamente', {
        position: 'top-center'
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error eliminando el almacén:', error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  }

  // Función para eliminar un estante
  const deleteOneShelf = async (id) => {
    try {
      await deleteShelf(id);
      toast.success('Estante eliminado correctamente', {
        position: 'top-center'
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error eliminando el estante:', error);
      toast.error(`Error eliminando el estante: ${error.response?.data?.message || error.message}`);
    }
  }

  // Función para renderizar lista de almacenes
  const renderStorages = () => {
    return stores.map(str => {
      return <MenuItem key={str.storage.id_almacen}
        value={str.storage.id_almacen}>
        {str.storage.nombre_almacen}
      </MenuItem>
    })
  }

  // Función para renderizar almacenes
  const renderStores = () => {
    const arrayPosition = currentPage - 1
    console.log(stores[arrayPosition])
    const element = stores[arrayPosition];

    if (!element) {
      return <p>No se encontraron almacenes.</p>;
    }

    return (
      <section className='storesContainer'>
        <TiDelete className='storeDeleteBtn' onClick={() => deleteStorage(element.storage.id_almacen)} />
        <h3>almacén {element.storage.nombre_almacen}</h3>
        <section className='standsContainer' id={element.storage.id_almacen}>
          <DefaultStand event={() => { setModalStandOpen(true) }} />
          {
            shelfs.map(shelf => {
              return shelf.map(s => {
                if (s.id_almacen === element.storage.id_almacen) {
                  return <StandCard key={s.id_estante} levels={s.niveles}
                    divisions={s.divisiones} name={s.nombre_estante}
                    full={s.lleno} almacen={element.storage.nombre_almacen}
                    id={s.id_estante}
                    event={() => deleteOneShelf(s.id_estante)} />
                }
                return null;
              })
            })
          }
        </section>
      </section>
    );
  };

  // Función para modificar la página actual y mostrar el almacén en base a la página en la que nos encontramos
  const modifyCurrentPage = (e, value) => {
    setCurrentPage(value);
    setShelfs([])
  };

  return (
    <div className='standsComponent'>
      <HeaderGeneric username={username} route='/podocenter/inventory'>
        Stands
      </HeaderGeneric>
      <div className='standsComponentContainer'>
        {renderStores()}
        <section className='btnsPaginationContainer'>
          <DefaultStore event={() => setModalIsOpen(true)} />
          <div className='pagesButtons'>
            <Pagination count={stores.length} size="large"
              onChange={modifyCurrentPage} variant="outlined" shape="rounded"/>
          </div>
        </section>
      </div>
      
      {/* Modal para agregar almacén */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel='Agregar almacén'
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '0'
          }
        }}
      >
        <div className='newProviderTitle'>
          <h2>Agregar almacén</h2>
        </div>
        <form className='newProviderForm' onSubmit={handleAddStore}>
          <TextField
            id='standard-basic'
            label='Nombre'
            variant='standard'
            fullWidth
            name='nombre_almacen'
            value={newStore.nombre_almacen}
            onChange={handleChange}
          />
          <TextField
            id='standard-basic'
            label='Ubicación'
            variant='standard'
            fullWidth
            name='ubicacion'
            value={newStore.ubicacion}
            onChange={handleChange}
          />
          <TextField
            id='standard-basic'
            label='Etiqueta/s'
            variant='standard'
            fullWidth
            name='etiquetas'
            value={newStore.etiquetas}
            onChange={handleChange}
          />
          <div className='newProviderFooter'>
            <GeneralButton type='submit'>Agregar</GeneralButton>
            <GeneralButton event={() => setModalIsOpen(false)}>Salir</GeneralButton>
          </div>
        </form>
      </Modal>

      {/* Modal para agregar estante */}
      <Modal
        isOpen={modalStandOpen}
        onRequestClose={() => setModalStandOpen(false)}
        contentLabel='Agregar estante'
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '0'
          }
        }}
      >
        <div className='newProviderTitle'>
          <h2>Agregar Estante</h2>
        </div>
        <form className='newProviderForm' onSubmit={addStand}>
          <TextField
            id='standard-basic'
            label='Nombre'
            variant='standard'
            fullWidth
            name='nombre_estante'
            value={newShelf.nombre_estante}
            onChange={handleShelfChange}
          />
          <TextField
            id='standard-basic'
            label='Niveles'
            variant='standard'
            fullWidth
            name='niveles'
            value={newShelf.niveles}
            onChange={handleShelfChange}
          />
          <TextField
            id='standard-basic'
            label='Divisiones'
            variant='standard'
            fullWidth
            name='divisiones'
            value={newShelf.divisiones}
            onChange={handleShelfChange}
          />
          <TextField
            id='standard-basic'
            label='Etiquetas'
            variant='standard'
            fullWidth
            name='etiquetas'
            value={newShelf.etiquetas}
            onChange={handleShelfChange}
          />
          <FormControl sx={{ width: '98%' }}>
            <InputLabel id='demo-simple-select-label'>Almacenes</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={newShelf.id_almacen}
              label='id_almacen'
              name='id_almacen'
              onChange={handleShelfChange}
            >
              {
                renderStorages()
              }
            </Select>
          </FormControl>
          <div className='newProviderFooter'>
            <GeneralButton type='submit'>Agregar</GeneralButton>
            <GeneralButton event={() => setModalStandOpen(false)}>Salir</GeneralButton>
          </div>
        </form>
      </Modal>
      
      <ToastContainer />
    </div>
  );
}

export default StandsComponent;