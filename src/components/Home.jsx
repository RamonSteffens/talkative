import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './Home.css';
import  { logout }  from '../redux/actions/user.actions.js';



function Home(props) {

  const [isLoged, setIsLoged] = useState(true)

  
  const onClickSair = () => {
    props.dispatch(logout({}))
    setIsLoged(false)
  }

  function isLogged() {
    if (!isLoged) {
      return <Redirect to="/login" />;
    }
  }

  return (
    <>
    {isLogged()}
    <div className="App">
      <div className="parte1">
      <Button onClick={onClickSair}>Sair</Button>
      </div>
      <div className="parte1">
      <div className="botoes">
      <Button className="botao" >Conteudo</Button>
      <Button className="botao" >Reuniões</Button>
      <Button className="botao" >Feedback</Button>
      </div>      
      </div>
      <div className="parte1">
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

export default connect(mapStateToProps)(Home);

/*
 <Card id={logedUser.id} name={logedUser.name} email={logedUser.email}/>
        {isLoged && <button onClick={onClickSair}>Sair</button>}
*/ 