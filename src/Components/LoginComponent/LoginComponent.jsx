import './LoginComponent.css'
import Logo from '../../assets/img/logo podocenter.png'
import officer from '../../assets/img/policia.png'
import TextField from '@mui/material/TextField'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { getAllUsers } from '../../services/userServices';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginComponent(){
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState(true);
    

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const users = await getAllUsers();
            console.log('Users:', users.data);
            setUsers(users.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, []);


    const redirect = () => {
        /* traverse te users to get the correct one */
        users.forEach(user => {
            if(user.username === username && user.password === password){
                /* saving it in localstorage  */
                localStorage.setItem('userid', JSON.stringify(user.idUser));
                localStorage.setItem('username', JSON.stringify(user.username));
                navigate('/podocenter/home')
            }else{
                toast.error('Usuario o contraseña incorrectos', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    }

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