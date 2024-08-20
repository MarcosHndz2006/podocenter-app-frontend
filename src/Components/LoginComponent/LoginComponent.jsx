import './LoginComponent.css'
import Logo from '../../assets/img/logo podocenter.png'
import officer from '../../assets/img/policia.png'
import TextField from '@mui/material/TextField'


function LoginComponent(){
    return(
        <div className="loginComponent">
            <section className="logoSection">
                <img src={Logo} alt="logo podocenter.png" heigth="250px" width="150px"/>
                <p>PODOCENTER</p>
            </section>
            <section className="authSection">
                <img src={officer} alt="policia.png" heigth="70px" width="70px"/>
                <p>¡Bienvenido!</p>
                <div>
                    <p>Ingrese los campos requeridos</p>
                    <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    defaultValue=""
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    />
                </div>
                <a href="#">Olvidé mi contraseña</a>
                <a href="#">No tengo una cuenta. ¡Registrarse!</a>
                <button>Ingresar</button>
            </section>
        </div>
    )
}

export default LoginComponent