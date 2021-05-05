import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import Card from './card/Card';
import Input from './input/Input';
import './Login.css'
import Logo from '../img/Logo.png'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions/user.actions';
import UserService from '../data/user.service';

const Login = (props) => {
  const [logedUser, setLogedUser] = useState({})
  const [isLoged, setIsLoged] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

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
      console.log('sucesso')
      cleanInputsLog()
      setIsLoged(true)
      function singIn() {
        console.log(login)
        props.dispatch(login(newUser))
      }
      singIn()
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

  const onClickSair = () => {
    setLogedUser({})
    setIsLoged(false)
  }

  function isLogged() {
    if (isLoged) {
      return <Redirect to="/home" />;
    }
  }

  function register() {
    if (isRegister) {
      console.log("register")
      return <Redirect to="/register" />;
    }
  }

  return (
    <>
      {isLogged()}
      {register()}
      <div className="Login">
        <div className="loginLeft">
          <div className="inputForm">
            <h1>Entrar</h1>
            <Input placeholder="email" type="email" name="E-mail:" childRef={emailLogRef} />
            <Input placeholder="senha" type="password" name="Senha:" childRef={passLogRef} />
            <Button className="buttonLogin" size="sm" onClick={onClickEntrar}>Entrar</Button>
            <div>Não possui conta? </div><a href="register" onClick={() => { setIsRegister(true) }} >Criar nova conta</a>
          </div>
        </div>
        <div className="loginRight">
          <Card id={logedUser.id} name={logedUser.name} email={logedUser.email} />
          {isLoged && <button onClick={onClickSair}>Sair</button>}
          <img src={Logo} className="imgLogin" alt="Talkative.logo" />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.UserReducer.user,
    logged: store.UserReducer.logged,
  };
};

export default connect(mapStateToProps)(Login);

/*localStorage.setItem('userId', response.data.id)
           localStorage.setItem('logedUser', JSON.stringify(response.data))*/