import React, { useEffect, useRef, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

function Range(props) {

    const [value1, setValue1] = useState()


    const ref = useRef(null)

    useEffect(() => {
        setValue1(ref.current.value)
    }, [])

    function name(params) {
        setValue1(ref.current.value)
        props.setValue(ref.current.value)
    }

    return (
        <ListGroup.Item variant="secondary">
            <Form>
                <Form.Group controlId="formBasicRange">
                    <h5>{props.texto}</h5>
                    <Form.Control type="range" ref={ref} onChange={() => { name() }} />
                    <h6 style={{ textAlign: 'center' }}>{value1}%</h6>
                </Form.Group>
            </Form>
        </ListGroup.Item>
    );
}

export default Range;
