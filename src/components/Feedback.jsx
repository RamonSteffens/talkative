import { useCallback, useEffect, useState } from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import FeedbackService from '../data/feedback.service';
import './Home.css';
import Menu from './Menu';

function Feedback() {

  const [isLogout, setIsLogout] = useState(false)
  const [feedsReceived, setFeedsReceived] = useState([])
  const [feedsAuthored, setFeedsAuthored] = useState([])
  const [key, setKey] = useState('home');

  const feedService = FeedbackService.get()

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

  function getUserId() {
    const userLoged = localStorage.getItem("userLoged");
    const userId = JSON.parse(userLoged).id;
    return userId;
  }


  useEffect(() => {
    getFeedsReceived();
    getFeedsAuthored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getFeedsReceived();
    getFeedsAuthored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const getFeedsReceived = useCallback(async () => {
    const userId = getUserId();
    let response = await feedService.getFeedbackReceived(userId)

    if (response.status === 200) {
      setFeedsReceived(response.data)
    } else {
    }
  }, [feedService])

  const getFeedsAuthored = useCallback(async () => {
    const userId = getUserId();

    let response = await feedService.getFeedbackAuthored(userId)

    if (response.status === 200) {
      setFeedsAuthored(response.data)
    } else {
    }
  }, [feedService])

  const getItensReceiver = () => {
    return (
      <tbody>
        {feedsReceived.map(feed =>
          <tr>
            <td>{feed.id}</td>
            <td>{feed.meetId}</td>
            <td>{feed.authorName}</td>
            <td>{feed.receiverName}</td>
            <td>{feed.socialBasic + "%"}</td>
            <td>{feed.socialAdvanced + "%"}</td>
          </tr>
        )}
      </tbody>
    )
  }

  const getItensAuthor = () => {
    return (
      <tbody>
        {feedsAuthored.map(feed =>
          <tr>
            <td>{feed.id}</td>
            <td>{feed.meetId}</td>
            <td>{feed.authorName}</td>
            <td>{feed.receiverName}</td>
            <td>{feed.socialBasic + "%"}</td>
            <td>{feed.socialAdvanced + "%"}</td>
          </tr>
        )}
      </tbody>
    )
  }

  function ControlledTabs() {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        style={{ background: '#343a40' }}
      >
        <Tab eventKey="home" title="Autor">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Identificador da Reunião</th>
                <th>Autor</th>
                <th>Recebedor</th>
                <th>Competências Sociais Básicas</th>
                <th>Competências Sociais Avançada</th>
              </tr>
            </thead>
            {getItensAuthor()}
          </Table>        </Tab>
        <Tab eventKey="profile" title="Recebedor">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Identificador da Reunião</th>
                <th>Autor</th>
                <th>Recebedor</th>
                <th>Competências Sociais Básicas</th>
                <th>Competências Sociais Avançada</th>
              </tr>
            </thead>
            {getItensReceiver()}
          </Table>
        </Tab>
      </Tabs>
    );
  }

  return (
    <>
      {noLogged()}
      <Menu logged={true} logout={logout}></Menu>
      <ControlledTabs />
    </>
  );
}

export default Feedback;