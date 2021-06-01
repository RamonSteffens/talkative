import { Button, Form } from 'react-bootstrap';
import { useRef, useState } from 'react';
import Input from './input/Input';
import './Login.css'
import Logo from '../img/Logo.png'
import { Redirect } from 'react-router-dom';
import UserService from '../data/user.service';
import Menu from './Menu';

const Login = (props) => {
  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const emailLogRef = useRef(null);
  const passLogRef = useRef(null);

  const userService = UserService.get()

  const loginUser = async () => {
    const newUser = {
      email: emailLogRef.current.value,
      password: passLogRef.current.value
    }
    
    let response = await userService.userLogin(newUser)

    if (response.status === 200 ){
      cleanInputsLog()
      localStorage.setItem("userLoged", JSON.stringify(response.data))
      localStorage.setItem("isLogged", true)
      setIsLogin(true)
    }else{
      console.log(response)
    }
  }

  const cleanInputsLog = () => {
    emailLogRef.current.value = "";
    passLogRef.current.value = "";
  }

  const onClickEntrar = () => {
    loginUser()
  }


  function isLogged() {
    if (isLogin) {
      return <Redirect to="/home" />;
    }
  }

  function register() {
    if (isRegister) {
      return <Redirect to="/register" />;
    }
  }

  return (
    <>
      {isLogged()}
      {register()}
      <Menu logged={false} ></Menu>
      <div className="Login">
        <div className="loginLeft">
          <div className="inputForm">
            <h1>Entrar</h1>
            <Form>
            <Input placeholder="email" type="email" name="E-mail:" childRef={emailLogRef} />
            <Input placeholder="senha" type="password" name="Senha:" childRef={passLogRef} />
            </Form>
            <Button className="buttonLogin" size="sm" onClick={onClickEntrar}>Entrar</Button>
            <div>Não possui conta? </div><a href="register" onClick={() => { setIsRegister(true) }} >Criar nova conta</a>
          </div>
        </div>
        <div className="loginRight">
          <img src={Logo} className="imgLogin" alt="Talkative.logo" />
        </div>
      </div>
    </>
  );
}

export default Login;