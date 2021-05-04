import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import Input from './components/input/Input';



function App() {
  const [logedUser, setLogedUser] = useState({})
  const [isLoged, setIsLoged] = useState(false)

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const emailLogRef = useRef(null);
  const passLogRef = useRef(null);

  const cleanInputs = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
  }

  const cleanInputsLog = () => {
    emailLogRef.current.value = "";
    passLogRef.current.value = "";
  }

  const onClickCadastrar = () => {
    createUser()
  }

  const onClickEntrar = ()=>{
    loginUser()
    setIsLoged(true)
  }

  const onClickSair = ()=>{
    setLogedUser({})
    setIsLoged(false)
  }

  const createUser = useCallback(()=>{
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000,
    });
    instance.post('/user', newUser)
    
    cleanInputs()
  },[])

  const loginUser = useCallback(()=>{
    const newUser = {
      email: emailLogRef.current.value,
      password: passLogRef.current.value
    }

    const callApi = async () => {
      const instance = axios.create({
        baseURL: 'http://localhost:8080',
      });
  
      await instance.post('/user/login', newUser)
      .then(function (response) {
        console.log(response.data)
        setLogedUser(response.data)
        localStorage.setItem('userId', response.data.id)
        localStorage.setItem('userLoged', JSON. stringify(response.data))
      }) 
    }

    callApi()
    cleanInputsLog()
  },[])

  return (
    <div className="App">
      <div className="parte1">
        <h1>Entre</h1>
        <Input placeholder="email" type="email" name="E-mail" childRef={emailLogRef} />
        <Input placeholder="senha" type="password" name="Senha" childRef={passLogRef} />
        <Button onClick={onClickEntrar}>Entrar</Button>
      </div>
      <div className="parte2">
        <h1>Cadastre</h1>
        <Input placeholder="nome" type="text" name="Nome" childRef={nameRef} />
        <Input placeholder="email" type="email" name="E-mail" childRef={emailRef} />
        <Input placeholder="senha" type="password" name="Senha" childRef={passRef} />
        <Button onClick={onClickCadastrar}>Cadastrar</Button>
      </div>
      <div className="parte1">
        <h1>Usuario</h1>
        <Card id={logedUser.id} name={logedUser.name} email={logedUser.email}/>
        {isLoged && <button onClick={onClickSair}>Sair</button>}
      </div>
    </div>
  );
}

export default App;
