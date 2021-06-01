import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, Button, Card, Form, Modal, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import MaterialService from '../data/material.service';
import './Home.css';
import Menu from './Menu';

function Material() {

  const [createdMaterial, setCreatedMaterial] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  const [materials, setMaterials] = useState([])
  const user = localStorage.getItem("userLoged")
  const materialService = MaterialService.get()
  const titleRef = useRef(null);
  const topicRef = useRef(null);
  const contentRef = useRef(null);
  const filterTopicRef = useRef(null);


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

  const getMaterials = useCallback(async () => {
    let response = await materialService.getMaterials()

    if (response.status === 200) {
      setMaterials(response.data)
    } else {
      console.log(response)
    }
  }, [materialService])

  useEffect(() => {
    getMaterials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdMaterial])


  const getItens = () => {
    return (
      <tbody>
        {materials.map(material =>
          <tr>
            <td>{material.id}</td>
            <td>{material.title}</td>
            <td>
              <Accordion defaultActiveKey="1">
                <Card>
                  <Accordion.Toggle as={Button} variant="outline-dark" eventKey="0">
                    Mais detalhes
                      </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body style={{ color: 'black' }}>{material.content}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </td>
            <td>{material.author}</td>
            <td>{material.topic}</td>
          </tr>
        )}
      </tbody>
    )
  }

  const registerMaterial = async (props) => {
    const realUser = JSON.parse(user)

    const title = titleRef.current.value;
    const topic = topicRef.current.value;
    const content = contentRef.current.value;
    const userId = realUser.id;

    const materialRequest = {
      title: title,
      topic: topic,
      content: content,
      userId: userId,
    }

    await materialService.createMaterial(materialRequest)
    setCreatedMaterial(true)
    setModalShow(false)
  }



  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastre um Material
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Titulo do material</Form.Label>
                <Form.Control type="text" placeholder="Ex: Material 1.." ref={titleRef} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Tema</Form.Label>
                <Form.Control type="text" placeholder="Ex: Trabalho.." ref={topicRef} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Conteudo</Form.Label>
                <Form.Control as="textarea" rows={3} ref={contentRef} />
              </Form.Group>
              <Button onClick={() => { registerMaterial(props) }}>Cadastrar Material</Button>
            </Form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal >
    );
  }

  const [modalShow, setModalShow] = useState(false);


  const filtrar = async () =>{
    const response = await materialService.getMaterialsByTopic(filterTopicRef.current.value);
    setMaterials(response.data)
  }

  return (
    <div style={{ background: "#343a40" }}>
      {noLogged()}
      <Menu logged={true} logout={logout}></Menu>
      <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
        <Button style={{ margin: "1%" }} onClick={() => { setModalShow(true) }}>Cadastre Material</Button>
        <Form style={{ display: "flex", flexDirection: "row" }}>
        <Button style={{ height: "max-content", marginTop: "32px" }} onClick={() => { getMaterials() }}>Remover filtro</Button>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>Filtrar por Tema</Form.Label>
            <Form.Control type="text" placeholder="Ex: Trabalho..." ref={filterTopicRef} />
          </Form.Group>
          <Button style={{ height: "max-content", marginTop: "32px" }} onClick={() => { filtrar() }}>Filtrar</Button>
        </Form>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Conteudo</th>
            <th>Autor</th>
            <th>Tema</th>
          </tr>
        </thead>
        {getItens()}
      </Table>
    </div>
  );
}

export default Material;