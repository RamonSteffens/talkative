import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import Card from './card/Card';
import Input from './input/Input';
import './Login.css'
import Logo from '../img/Logo.png'

function Login() {
    const [logedUser, setLogedUser] = useState({})
    const [isLoged, setIsLoged] = useState(false)

    const emailLogRef = useRef(null);
    const passLogRef = useRef(null);

    const cleanInputsLog = () => {
        emailLogRef.current.value = "";
        passLogRef.current.value = "";
    }

    const onClickEntrar = () => {
        loginUser()
    }

    const onClickSair = () => {
        setLogedUser({})
        setIsLoged(false)
        localStorage.clear()
    }

    const loginUser = useCallback(() => {
        const newUser = {
            email: emailLogRef.current.value,
            password: passLogRef.current.value
        }

        const callApi = async () => {
            const instance = axios.create({
                baseURL: 'http://localhost:8080',
            });

        const response = instance.post('/user/login', newUser)
        
        response.then(function (response) {
            setLogedUser(response.data)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('userLoged', JSON.stringify(response.data))
            setIsLoged(true)   
        })
            .catch(function (error) {
                console.log(error.data)
            })
        }

        callApi()
        cleanInputsLog()
    }, [])

    return (
        <div className="Login">
            <div className="loginLeft">
                <div className="inputForm">
                <h1>Entrar</h1>
                <Input placeholder="email" type="email" name="E-mail:" childRef={emailLogRef} />
                <Input placeholder="senha" type="password" name="Senha:" childRef={passLogRef} />
                <Button className="buttonLogin" size="sm" onClick={onClickEntrar}>Entrar</Button>
                <div>Não possui conta? </div><a href="#/register">Cadastre-se</a>
                </div>
            </div>
            <div className="loginRight">
                <Card id={logedUser.id} name={logedUser.name} email={logedUser.email} />
                {isLoged && <button onClick={onClickSair}>Sair</button>}
                <img src={Logo} className="imgLogin" alt="Talkative.logo"/>
            </div>
        </div>
    );
}

export default Login;
