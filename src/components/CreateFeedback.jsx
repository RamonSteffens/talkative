import { useEffect, useState } from 'react';
import { Alert, Button, ListGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import FeedbackService from '../data/feedback.service';
import './Home.css';
import Menu from './Menu';
import Range from './Range';

function CreateFeedback() {

  const meetId = localStorage.getItem("meetId")
  const authorId = localStorage.getItem("authorId")
  const [isLogout, setIsLogout] = useState(false)
  const feedService = FeedbackService.get()

  const [isCreated, setIsCreated] = useState(false) 

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

  const [value1, setValue1] = useState(50)
  const [value2, setValue2] = useState(50)
  const [value3, setValue3] = useState(50)
  const [value4, setValue4] = useState(50)
  const [value5, setValue5] = useState(50)

  const [value6, setValue6] = useState(50)
  const [value7, setValue7] = useState(50)
  const [value8, setValue8] = useState(50)
  const [value9, setValue9] = useState(50)
  const [value10, setValue10] = useState(50)

  useEffect(() => {
  }, [isCreated])

  function renderGroup1() {
    return (
      <ListGroup variant="flush">
        <ListGroup.Item variant="secondary">
          <div style={{}}>
            <h2 style={{ textAlign: 'center' }}>Feedback sobre seu parceiro(a) de conversação:</h2>
          </div>
        </ListGroup.Item>
        <p />
        <ListGroup.Item >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Alert variant="secondary">
              <Alert.Heading>Competências Sociais Básicas</Alert.Heading>
            </Alert>
          </div>
        </ListGroup.Item>
        <Range texto="1.1 - Apresentação (escolher o momento
                  certo para apresentar-se;
                  cumprimentar a pessoa e dizer o seu
                  nome)" setValue={setValue1} />
        <p />
        <Range texto="1.2 - Engajamento da conversa
                  (cumprimentar a pessoa; fazer uma
                  pequena conversa; perceber se a outra
                  pessoa está a ouvir)" setValue={setValue2} />
        <p />
        <Range texto="1.3 - Conversação (falar sobre um assunto
                  que seja do interesse de ambos; perguntar 
                  e responder quando necessário;
                  compreender o que está sendo dito;
                  esperar pela sua vez de falar)"setValue={setValue3} />
        <p />
        <Range texto="1.4 - Agradecimento (expressar o
                  sentimento de gratidão para com os
                  outros)"setValue={setValue4} />
        <p />
        <Range texto="1.5 - Dar um elogio (realçar uma
                  característica ou ação positiva de outra
                  pessoa)" setValue={setValue5} />
        <p />
      </ListGroup>
    );
  }

  function renderGroup2() {
    return (
      <ListGroup variant="flush">
        <ListGroup.Item >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Alert variant="secondary">
              <Alert.Heading>Competências Sociais Avançadas</Alert.Heading>
            </Alert>          </div>

        </ListGroup.Item>
        <Range texto="2.1 - Pontualidade (comparecer no dia e hora
                      marcada)" setValue={setValue6} />
        <p />
        <Range texto="2.2 - Explicar uma tarefa (explicar de
                      forma clara a outra pessoa como fazer
                      uma determinada tarefa)" setValue={setValue7} />
        <p />
        <Range texto="2.3 - Seguir instruções (prestar atenção
                      às instruções e cumpri-las de forma
                      adequada)"setValue={setValue8} />
        <p />
        <Range texto="2.4 - Pedir desculpa (dizer a outra pessoa
                      que se lamenta algo feito de forma 
                      equivocada)"setValue={setValue9} />
        <p />
        <Range texto="2.5 - Convencimento (levar os
                      outros a perceber que a sua ideia é
                      melhor e mais útil do que outra ideia)" setValue={setValue10} />
      </ListGroup>
    );
  }

  const sendFeedback = async () => {
    const createFeedbackRequest ={
      meetId: meetId,
      authorId: authorId,
      listOfBasicCompetence: [value1, value2, value3, value4, value5],
      listOfAdvancedCompetence: [value6, value7, value8, value9, value10]
    }

    const response = await feedService.createFeedback(createFeedbackRequest)
    if (response.status === 201) {
      console.log(response.status)
      setIsCreated(true)
    }
  }

  function createdFeedback() {
    if (isCreated){
      console.log("indo pro feed")
      localStorage.removeItem("meetId")
      localStorage.removeItem("authorId")
      return <Redirect to="/feedback" />;
    }
  }

  return (
    <>
      {createdFeedback()}
      {noLogged()}
      <Menu logged={true} logout={logout}></Menu>
      {renderGroup1()}
      {renderGroup2()}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1%' }}>
        <Button variant="success" size="lg" onClick={() => { sendFeedback() }} >Enviar Feedback</Button>
      </div>
    </>
  );
}

export default CreateFeedback;