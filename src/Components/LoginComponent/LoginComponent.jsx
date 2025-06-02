import './LoginComponent.css'
import Logo from '../../assets/img/logo podocenter.png'
import officer from '../../assets/img/policia.png'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../../services/userServices';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate()

    const redirect = async () => {

        const user = await authUser(username, password)

        try {
            console.log(user)
            localStorage.setItem('userid', JSON.stringify(user.data[0].id_usuario));
            localStorage.setItem('username', JSON.stringify(user.data[0].username));
            localStorage.setItem('rolid', JSON.stringify(user.data[0].id_rol));

            navigate('/podocenter/home')
            toast.success('acceso exitoso');

        } catch (error) {
            console.log(user)
            toast.error(`Error: ${error.response.data.message}`);
        }
    }

    return (
        <div className="loginComponent">
            <section className="logoSection">
                <img src={Logo} alt="logo podocenter.png" heigth="250px" width="150px" />
                <p>PODOCENTER</p>
            </section>
            <section className="authSection">
                <img src={officer} alt="policia.png" heigth="70px" width="70px" />
                <p>¡Bienvenido!</p>
                <div>
                    <p>Ingrese los campos requeridos</p>
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        defaultValue=""
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        defaultValue=""
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a href="#">Olvidé mi contraseña</a>
                <a href="#">No tengo una cuenta. ¡Registrarse!</a>
                <button onClick={redirect}>Ingresar</button>
            </section>
            <ToastContainer />
        </div>
    )
}

export default LoginComponent