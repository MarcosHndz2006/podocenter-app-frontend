import './NavButtonGeneric.css'

function NavButtonGeneric(props){
    return(
        <div className='navButtonGeneric'>
            {props.children}
        </div>
    )
}

export default NavButtonGeneric