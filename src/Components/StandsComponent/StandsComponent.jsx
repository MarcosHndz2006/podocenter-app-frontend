// Import del archivo .css
import './StandsComponent.css';
// Imports de componentes o reutilizables
import HeaderGeneric from '../../Generics/HeaderGeneric/HeaderGeneric';
import StandCard from '../../Generics/StandCard/StandCard';
import DefaultStore from '../../Generics/DefaultStore/DefaultStore';
import DefaultStand from '../../Generics/DefaultStand/DefaultStand';
import PaginationButton from '../../Generics/PaginationButton/PaginationButton';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import GeneralButton from '../../Generics/GeneralButton/GeneralButton';
// Import de useState y useEffect
import { useState, useEffect } from 'react';
import { createStore, getAllStores } from '../../services/storeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StandsComponent() {
  const username = localStorage.getItem('username').slice(1, -1);

  // Sección de variables de estado y navegación del componente
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    location: '',
    tags: ''
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const fetchedStores = await getAllStores();
        setStores(fetchedStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  // Función para manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: value
    }));
  };

  // Función para agregar un nuevo almacén
  const handleAddStore = async (event) => {
    event.preventDefault();
    try {
      const createdStore = await createStore(newStore);
      setStores((prevStores) => [
        ...prevStores,
        { idStorage: createdStore.idStorage, name: createdStore.name, stands: [<DefaultStand event={addStand} />] }
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
  const addStand = (id) => {
    const element = stores.find((str) => (str.idStorage == id ? str : false));
    console.log(element);

    const newElement = {
      idStorage: element.idStorage,
      name: element.name,
      stands: [...element.stands, <StandCard />]
    };
    console.log(newElement);

    setStores((stores) => {
      return stores.map((str) => (str.idStorage == id ? newElement : str));
    });
  };

  // Función para renderizar almacenes
  const renderStores = () => {
    const element = stores.find((str) => (str.idStorage == currentPage ? str : false));

    if (!element) {
      return <p>No se encontraron almacenes.</p>;
    }

    return (
      <section className='storesContainer'>
        <h3>{element.name}</h3>
        <section className='standsContainer' id={element.idStorage}>
          {element.stands}
        </section>
      </section>
    );
  };

  // Función para renderizar los botones de paginación
  const renderPaginationButtons = () => {
    let buttons = [];

    for (let index = 0; index < stores.length; index++) {
      buttons.push(
        <PaginationButton
          key={index}
          identifier={stores[index].idStorage}
          event={modifyCurrentPage}
          currentPage={currentPage}
        />
      );
    }

    return buttons;
  };

  // Función para modificar la página actual y mostrar el almacén en base a la página en la que nos encontramos
  const modifyCurrentPage = (id) => {
    setCurrentPage(id);
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
          <div className='pagesButtons'>{renderPaginationButtons()}</div>
        </section>
      </div>
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
            name='name'
            value={newStore.name}
            onChange={handleChange}
          />
          <TextField
            id='standard-basic'
            label='Ubicación'
            variant='standard'
            fullWidth
            name='location'
            value={newStore.location}
            onChange={handleChange}
          />
          <TextField
            id='standard-basic'
            label='Etiqueta/s'
            variant='standard'
            fullWidth
            name='tags'
            value={newStore.tags}
            onChange={handleChange}
          />
          <div className='newProviderFooter'>
            <GeneralButton type='submit'>Agregar</GeneralButton>
            <GeneralButton event={() => setModalIsOpen(false)}>Salir</GeneralButton>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default StandsComponent;