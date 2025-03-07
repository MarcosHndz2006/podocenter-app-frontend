import './HeaderGeneric.css'
import logout from '../../assets/img/salida.png'
import { useNavigate } from 'react-router-dom'

function HeaderGeneric(props) {

    //sección de variables

    /* variable de navegación */
    const navigate = useNavigate()

    //sección de funciones

    /* función de navegación */
    const redirect = () => {
        navigate(`${props.route}`)
    }

    /* función para ir a la vista de perfil de usuario */
    const profile = () => {
        navigate("/podocenter/profile/my")
    }

    return (
        <div className="headerGeneric" >
            <p onClick={profile}>{props.username}</p>
            {
                props.children
            }
            <img src={logout} alt="salida.png" onClick={redirect} />
        </div>
    )
}

export default HeaderGeneric