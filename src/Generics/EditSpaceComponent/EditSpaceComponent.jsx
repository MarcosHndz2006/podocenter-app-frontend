// import de archivo .css
import './EditSpaceComponent.css'
// imports de componentes o funciones de react
import TextField from '@mui/material/TextField';
import GeneralButton from '../GeneralButton/GeneralButton'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSpaceById, getSpaceStates, updateSpaceInfo } from '../../services/spacesService';
import { toast } from 'react-toastify';

function EditSpaceComponent() {

    const { identifier } = useParams()
    // sección de useEffect

    useEffect(() => {
        const fetchSpaceInfo = async () => {
            const space = await getSpaceById(identifier)
            setSpaceValues({
                nombre_espacio: space.data.nombre_espacio,
                unidad_servicio_espacio: space.data.unidad_servicio_espacio,
                costo_unidad_servicio_espacio: space.data.costo_unidad_servicio_espacio,
                cuenta_cargo: space.data.cuenta_cargo,
                cuenta_abono: space.data.cuenta_abono,
                id_estado_espacio: space.data.id_estado_espacio
            })
        }

        const fetchStates = async () => {
            const states = await getSpaceStates()
            setStates(states.data)
        }

        fetchSpaceInfo()
        fetchStates()
    }, [])

    // sección de variables

    /* variable para setear los valores a guardar del espacio */
    const [spaceValues, setSpaceValues] = useState({
        nombre_espacio: '',
        unidad_servicio_espacio: '',
        costo_unidad_servicio_espacio: '',
        cuenta_cargo: null,
        cuenta_abono: null,
        id_estado_espacio: ''
    })

    /* variable para almacenar los estados que puede adquirir un espacio */
    const [states, setStates] = useState([])

    /* variable de navegación */
    const navigate = useNavigate()

    // sección de funciones

    /* función para renderizar opciones de estado */
    const renderStateValues = () => {
        return states.map(s => {
            return <MenuItem key={s.id_estado_espacio}
                value={s.id_estado_espacio}>
                {s.nombre_estado_espacio}
            </MenuItem>
        })
    }

    /* funcion de navegación al perfil */
    const profile = () => {
        navigate('/podocenter/profile/my')
    }

    /* función para guardar la data editada del espacio */
    const handleSubmit = async () => {
        const result = await updateSpaceInfo(spaceValues, identifier)
        if (result) {
            toast.success('Espacio editado con éxito', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

            navigate('/podocenter/profile/my')

        } else {
            toast.error('No se pudo editar el espacio', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });

        }
    }

    /* función para obtener los valores de los campos */
    const handleChange = (e) => {
        const { name, value } = e.target
        setSpaceValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
        console.log(name, value)
    }

    return (
        <div className='editSpaceComponent'>
            <div className='editSpaceTitle'>
                <h2>Editar espacio</h2>
            </div>
            <form className='editSpaceForm'>
                <TextField
                    id='standard-basic'
                    label='Nombre espacio'
                    variant='standard'
                    fullWidth
                    name='nombre_espacio'
                    value={spaceValues.nombre_espacio}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Unidad de servicio de espacio'
                    variant='standard'
                    fullWidth
                    name='unidad_servicio_espacio'
                    value={spaceValues.unidad_servicio_espacio}
                    onChange={handleChange}
                />
                <TextField
                    id='standard-basic'
                    label='Costo de unidad de servicio de espacio'
                    variant='standard'
                    fullWidth
                    name='costo_unidad_servicio_espacio'
                    value={spaceValues.costo_unidad_servicio_espacio}
                    onChange={handleChange}
                />
                <p>Si por defecto el estado del espacio es "ocupado" no debes cambiarlo</p>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id='demo-simple-select-label-clasification-service'>
                        Estados
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Estados'
                        name='id_estado_espacio'
                        onChange={handleChange}
                        value={spaceValues.id_estado_espacio}
                    >
                        {
                            renderStateValues()
                        }
                    </Select>
                </FormControl>
                <div className='editSpaceFooter'>
                    <GeneralButton type='submit' event={handleSubmit}>Guardar</GeneralButton>
                    <GeneralButton event={profile}>Salir</GeneralButton>
                </div>
            </form>
        </div>
    )
}

export default EditSpaceComponent