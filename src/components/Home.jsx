import { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import Menu from './Menu';
import { Card, Carousel, ListGroup, ListGroupItem } from 'react-bootstrap';
import imagem1 from '../img/SoftSkills.png'
import { Button } from 'react-bootstrap';
import FeelinglService from '../data/feeling.service';


function Home() {

  const [logedUser, setLogedUser] = useState({})
  const [isLogout, setIsLogout] = useState(false)
  const [feeling, setFeeling] = useState("")
  const feelingService = FeelinglService.get()


  const user = localStorage.getItem("userLoged")

  function noLogged() {
    if (isLogout) {
      return <Redirect to="/login" />;
    }
  }

  const logout = () => {
    setIsLogout(true)
    localStorage.setItem("isLogged", false)
    localStorage.setItem("userLoged", JSON.stringify({}))
  }

  useEffect(() => {
    let user = localStorage.getItem("userLoged")
    if (user) {
      setLogedUser(JSON.parse(user))
    }
  }, [user])

  const refHappy = useRef(null);
  const refSad = useRef(null);


  const registerFeelingSad = (value)=> {
    let feeling = {
      feeling: value,
      userId: logedUser.id
    }
    setFeeling(value)
    localStorage.setItem("feeling", value)
    feelingService.registerFeeling(feeling)
  }

  return (
    <div className="body">
      {noLogged()}
      <Menu logged={true} logout={logout}></Menu>
      <div className="menu">
        <div className="parte1">
          <Card >
            <Card.Body>
              <Card.Title>Seja bem vindo, {logedUser.name}!</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Email: {logedUser.email}</ListGroupItem>
              <ListGroupItem>Id: {logedUser.id}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Title>Registre seu sentimento:</Card.Title>
              <div className="feeling">
                <div className="button1">
                  <Button variant="outline-dark" value="Feliz" ref={refHappy} onClick={()=>{registerFeelingSad(refHappy.current.value)}}> Feliz </Button>
                </div>
                <div className="button2">
                  <Button variant="outline-dark"value="Triste"ref={refSad} onClick={()=>{registerFeelingSad(refSad.current.value)}}> Triste </Button>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <Card.Title>Sentimento Atual:</Card.Title>
              {feeling === "Feliz" && <img style={{height: "fit-content"}} alt="feliz" src="https://twemoji.maxcdn.com/2/svg/1f603.svg"/>}
              {feeling === "Triste" && <img style={{height: "fit-content"}} alt="triste" src="https://twemoji.maxcdn.com/2/svg/1f641.svg" />}
            </Card.Body>
          </Card>
        </div>
        <div className="parte2">
          <Carousel slide={false} >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imagem1}
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Home;

//<Card id={logedUser.id} name={logedUser.name} email={logedUser.email} />

/*
        {isLoged && <button onClick={onClickSair}>Sair</button>}
*/