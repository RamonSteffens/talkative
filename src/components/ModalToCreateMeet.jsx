import React from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

function ModalToCreateMeet2(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Crie uma Reunião
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Titulo da reunião</Form.Label>
                            <Form.Control type="text" placeholder="Ex: Reunião sobre Sentimentos.." ref={props.nameRef} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Selecione um conteudo</Form.Label>
                                {props.getMaterialsTitleList()}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Selecione uma Data:</Form.Label>
                            <FormControl
                                type="date"
                                style={{ width: '100%' }}
                                ref={props.timeRef}
                            />
                        </Form.Group>
                        <Button onClick={() => { props.createMeet() }}>Criar Reunião</Button>
                    </Form>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalToCreateMeet2;
