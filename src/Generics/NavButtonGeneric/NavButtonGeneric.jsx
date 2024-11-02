import './NavButtonGeneric.css'
import {useNavigate} from 'react-router-dom'

function NavButtonGeneric(props){

    const navigate = useNavigate()

    //función de navegación
    const redirect = () => {
        navigate(`${props.route}`)
    }

    return(
        <div className='navButtonGeneric' onClick={redirect}>
            {props.children}
        </div>
    )
}

export default NavButtonGeneric