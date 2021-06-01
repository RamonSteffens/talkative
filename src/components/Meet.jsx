import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import MaterialService from '../data/material.service';
import './Home.css';
import MeetService from '../data/meet.service';
import Menu from './Menu';
import ModalToCreateMeet2 from './ModalToCreateMeet';
import ModalToEnter2 from './ModalToEnter2';

function Meet() {

  const [isLogout, setIsLogout] = useState(false)
  const [toEnterModal, setToEnterModal] = useState(false);
  const [toCreateModal, setToCreateModal] = useState(false);
  const [isCreator, setIsCreator] = useState(false)
  const user = localStorage.getItem("userLoged")
  const [materialsTitle, setMaterialsTitle] = useState([])
  const [activeMeets, setActiveMeets] = useState([])
  const [createdMeet, setCreatedMeet] = useState(false)
  const [meetUrl, setMeetUrl] = useState("")
  const [partnerUrl, setPartnerUrl] = useState("")
  const [meetId, setMeetId] = useState(null)
  const refUrl = useRef(null)
  const nameRef = useRef(null)
  const materialRef = useRef(null)
  const timeRef = useRef(null)
  const meetService = MeetService.get();
  const materialService = MaterialService.get()

  function noLogged() {
    if (isLogout) {
      return <Redirect to="/login" />;
    }
  }

  const logout = () => {
    setIsLogout(true)
    localStorage.setItem("isLogged", false)
    localStorage.setItem("userLoged", JSON.stringify({}))
    localStorage.clear()
  }

  const createMeet = async () => {
    const realUser = JSON.parse(user)

    const name = nameRef.current.value;
    const material = materialRef.current.value;
    const time = timeRef.current.value;
    const userId = realUser.id;

    const meetRequest = {
      name: name,
      material: material,
      meetTime: time,
      userCreatorId: userId,
    }

    await meetService.createMeet(meetRequest)
    setCreatedMeet(true)
    setToCreateModal(false)
  }

  const joinMeet = async () => {
    const userLoged = localStorage.getItem("userLoged");
    const userId = JSON.parse(userLoged).id;

    const request = {
      meetId: meetId,
      userPartnerId: userId
    }

    var response = await meetService.joinMeet(request)
    setPartnerUrl(response.data.meetUrl)
  }

  const getActiveMeets = useCallback(async () => {
    let response = await meetService.getActiveMeets()

    if (response.status === 200) {
      setActiveMeets(response.data)
    } else {
    }
  }, [meetService])

  const getItensMeetActive = () => {
    return (
      <tbody>
        {activeMeets.map(meet =>
          <tr key={meet.id}>
            <td>{meet.id}</td>
            <td>{meet.name}</td>
            <td>{meet.userCreatorId}</td>
            <td>{format(new Date(meet.meetTime), "dd-MM-yyyy")}</td>
            <td><Button variant="outline-primary" onClick={() => { decisionMeet(meet) }}>Entrar</Button></td>
          </tr>
        )}
      </tbody>
    )
  }

  const getMaterialsTitle = useCallback(async () => {
    let response = await materialService.getMaterials()

    if (response.status === 200) {
      setMaterialsTitle(response.data)
    } else {
    }
  }, [materialService])

  const getMaterialsTitleList = () => {
    return (
      <Form.Control as="select" ref={materialRef}>
        {materialsTitle.map(material =>
          <option key={material.id}>{material.title}</option>
        )}
      </Form.Control>
    )
  }

  useEffect(() => {
    getActiveMeets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getActiveMeets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdMeet])

  useEffect(() => {
    getMaterialsTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCreateModal])

  const [isPartnerFeedback, setIsPartnerFeedback] = useState(false)
  const [isCreatorFeedback, setIsCreatorFeedback] = useState(false)

  function isFeedback() {
    const userId = getUserId()
    if (isPartnerFeedback || isCreatorFeedback) {
      localStorage.setItem("meetId", meetId)
      localStorage.setItem("authorId", userId)
      return <Redirect to="/create-feedback" />;
    }
  }

  function getUserId(){
    const userId = JSON.parse(user).id;
    return userId;
  }

  function decisionMeet(meet) {
    const userLoged = localStorage.getItem("userLoged");
    const userId = JSON.parse(userLoged).id;
    if (userId === meet.userCreatorId) {
      setIsCreator(true)
    } else {
      setIsCreator(false)
    }
    setMeetId(meet.id)
    setToEnterModal(true)
  }

  function closeToEnterModal() {
    setPartnerUrl(null)
    setMeetUrl(null)
    setToEnterModal(false)
  }

  return (
    <>
      {noLogged()}
      {isFeedback()}
      <>
        <Menu logged={localStorage.getItem("isLogged")} logout={logout}></Menu>
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", background: "#3e444a" }}>
          <Button style={{ margin: "1%" }} onClick={() => { setToCreateModal(true) }}>Criar Reunião</Button>
        </div>
        <Table striped bordered hover variant="dark">
          <ModalToCreateMeet2
            show={toCreateModal}
            onHide={() => setToCreateModal(false)}
            getMaterialsTitleList={getMaterialsTitleList}
            timeRef={timeRef}
            createMeet={createMeet}
            nameRef={nameRef}
          />
          <ModalToEnter2
            show={toEnterModal}
            onHide={() => setToEnterModal(false)}
            meetUrl={meetUrl}
            refUrl={refUrl}
            partnerUrl={partnerUrl}
            meetId={meetId}
            setMeetUrl={setMeetUrl}
            isCreator={isCreator}
            setIsCreatorFeedback={setIsCreatorFeedback}
            setIsPartnerFeedback={setIsPartnerFeedback}
            joinMeet={joinMeet}
            closeToEnterModal={closeToEnterModal}
          />
          <thead>
            <tr>
              <th>#</th>
              <th>Conteudo</th>
              <th>Identificação do Criador</th>
              <th>Data</th>
              <th>Ingressar</th>
            </tr>
          </thead>
          {getItensMeetActive()}
        </Table>
      </>
    </>
  );
}

export default Meet;