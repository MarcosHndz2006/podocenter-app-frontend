import './HeaderGeneric.css'
import logout from '../../assets/img/salida.png'

function HeaderGeneric(props){
    return(
        <div className="headerGeneric">
            <p>{props.username}</p>
            {
                props.children
            }
            <img src={logout} alt="salida.png"/>
        </div>
    )
}

export default HeaderGeneric