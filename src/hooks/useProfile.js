import { useState, useEffect } from 'react';
import { getAllUsers, getUserById } from '../services/userServices';
import { createService, deleteService, getAllServiceClasifications, getAllServices, getAllServiceSubclasification, getServicesByUserId } from '../services/serviceService';
import { createSpace, deleteSpace, getAllSpaces } from '../services/spacesService';
import { toast } from 'react-toastify';

export const useProfile = () => {
  const username = localStorage.getItem('username').slice(1, -1);
  const userid = localStorage.getItem('userid');

  // Estados
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [spaceModalIsOpen, setSpaceModalIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [clasifications, setClasifications] = useState([]);
  const [subclasifications, setSubclasifications] = useState([]);
  const [users, setUsers] = useState([]);

  const [service, setService] = useState({
    nombre_servicio: '',
    unidad_servicio: '',
    precio_unitario: '',
    id_usuario: '',
    id_espacio: '',
    id_clasificacion: '',
    id_subclasificacion: ''
  });

  const [space, setSpace] = useState({
    nombre_espacio: '',
    unidad_servicio_espacio: '',
    costo_unidad_servicio_espacio: ''
  });

  // useEffect para cargar datos iniciales
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userid);
        setUser(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchServices = async () => {
      try {
        var servicesData = []
        if (userid == 1) {
          servicesData = await getAllServices();
          setServices(servicesData.data.data)
        } else {
          servicesData = await getServicesByUserId(userid);
          console.log(servicesData.data)
          setServices(servicesData.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchSpaces = async () => {
      try {
        const spacesData = await getAllSpaces();
        setSpaces(spacesData.data)
      } catch (error) {
        console.error('Error fetching spaces: ', error)
      }
    }

    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users.data)
      } catch (error) {
        console.error('Error fetching users: ', error)
      }
    }

    const fetchClasifications = async () => {
      try {
        const clasifications = await getAllServiceClasifications()
        setClasifications(clasifications.data.data)
      } catch (error) {
        console.error("Error fetching all service clasifications: ", error)
      }
    }

    const fetchSubclasifications = async () => {
      try {
        const subclasifications = await getAllServiceSubclasification()
        setSubclasifications(subclasifications.data.data)
      } catch (error) {
        console.error("Error fetching all service subclasifications: ", error)
      }
    }

    fetchUserData();
    fetchServices();
    fetchSpaces();
    fetchUsers()
    fetchClasifications()
    fetchSubclasifications()
  }, [userid]);

  // Funciones de manejo de eventos
  const handleChange = (e) => {
    const { name, value } = e.target
    setService((s) => ({
      ...s,
      [name]: `${value}`
    }))
  }

  const handleChangeSpace = (e) => {
    const { name, value } = e.target
    setSpace((sp) => ({
      ...sp, 
      [name]: `${value}`
    }))
  }

  // Funciones CRUD para servicios
  const addService = async () => {
    try {
      await createService(service);
      toast.success('Servicio añadido con éxito');
      setModalIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  }

  const deleteOneService = async (id) => {
    try {
      await deleteService(id);
      toast.success('Servicio eliminado con éxito');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }

  // Funciones CRUD para espacios
  const addSpace = async () => {
    try {
      const result = await createSpace(space);
      
      if (result.data.message == "OK") {
        toast.success('Espacio agregado con éxito');
        setSpaceModalIsOpen(false);
      } else {
        toast.error('No se puede agregar el espacio');
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  }

  const deleteOneSpace = async (id) => {
    try {
      await deleteSpace(id);
      toast.success('Espacio eliminado con éxito');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  }

  return {
    // Estados
    user,
    username,
    userid,
    modalIsOpen,
    setModalIsOpen,
    spaceModalIsOpen,
    setSpaceModalIsOpen,
    services,
    spaces,
    clasifications,
    subclasifications,
    users,
    service,
    space,
    
    // Funciones
    handleChange,
    handleChangeSpace,
    addService,
    deleteOneService,
    addSpace,
    deleteOneSpace
  };
};