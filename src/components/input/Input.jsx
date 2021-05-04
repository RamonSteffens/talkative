import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap';
import './Input.css' 

function MyInput({name, ...rest}, props) {

  return (
    <div className="input">
      <Form>
      <Form.Group controlId="formBasicEmail">
      <Form.Label>{name}</Form.Label>
      <Form.Control type={rest.type} placeholder={rest.placeholder} ref={rest.childRef}/>
      </Form.Group>
      </Form>        
    </div>
  );
}

export default  forwardRef(MyInput);