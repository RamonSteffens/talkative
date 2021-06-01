import axios from 'axios';
import { Alert, Button } from 'react-bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import './Cadastre.css';
import Input from './input/Input';
import img from '../img/MeetOnl.webp'
import Menu from './Menu';


function Cadastre() {
  const [isCreated, setIsCreated] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const cleanInputs = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
  }

  const onClickCadastrar = () => {
    createUser()
  }

  const createUser = useCallback(() => {
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value
    }

    if (newUser.name === '') {
      nameRef.current.focus()
    } else if (newUser.email === '') {
      emailRef.current.focus()
    } else if (newUser.password === '') {
      passRef.current.focus()
    }

    if (newUser.email !== '' && newUser.password !== '' && newUser.name !== '') {
      const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
      });
      const response = instance.post('/user', newUser)
      response.then(function (response) {
        setIsCreated(true)
        cleanInputs()
      })
        .catch(function (error) {
          if (error.response.data.status === 500) {
            emailRef.current.value = ""
            setEmailError(true)
          }
        });
    }
  }, [])

  useEffect(() => {
    setTimeout(function () {
      setEmailError(false)
    }, 5000);
  }, [emailError])

  return (
    <>
      <Menu logged={false} ></Menu>
      <div className="Cadastre">
        <div className="registerLeft">
          <img className="imgRegister" alt="MeetOnline" src={img} />
        </div>
        <div className="registerRight">
          <div className="inputFormRegister">
            <div className="modalCreated"></div>
            <h1>Cadastre-se</h1>
            <Input placeholder="nome" type="text" name="Nome" childRef={nameRef} id="name" />
            <Input placeholder="email" type="email" name="E-mail" childRef={emailRef} id="email" />
            {emailError && <Alert key='1' variant='danger'>Email já cadastrado ou inválido!</Alert>}
            <Input placeholder="senha" type="password" name="Senha" childRef={passRef} id="password" />
            <Button className="buttonRegister" size="sm" onClick={onClickCadastrar} >Cadastrar</Button>
            <a href="/login" >Voltar para tela de login</a>
            {isCreated &&
              <Alert variant="success" style={{ position: "absolute" }} onClose={() => setIsCreated(false)} dismissible>
                <Alert.Heading>Seja bem vindo ao Talkative!</Alert.Heading>
                <p>Sucesso ao realizar o cadastro</p>
              </Alert>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastre;
