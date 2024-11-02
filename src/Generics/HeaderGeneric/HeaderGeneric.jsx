import './HeaderGeneric.css'
import logout from '../../assets/img/salida.png'
import {useNavigate} from 'react-router-dom'

function HeaderGeneric(props) {

    const navigate = useNavigate()

    //función de navegación
    const redirect = () => {
        navigate(`${props.route}`)
    }
    return (
        <div className="headerGeneric" >
            <p>{props.username}</p>
            {
                props.children
            }
            <img src={logout} alt="salida.png" onClick={redirect}/>
        </div>
    )
}

export default HeaderGeneric