import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextArea() {
    return (
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control style={{ height: '40em' }} as="textarea" rows={3} />
      </Form.Group>
    )
}

export default TextArea;
