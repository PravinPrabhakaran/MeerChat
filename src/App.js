import React from 'react';
import TextArea from './TextArea'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Container>
        <Row>
            <h1>CTM-GPT</h1>
        </Row>
        <Row>
          <TextArea />
        </Row>
        
        <Form className="d-flex">
          <Form.Control type="text" placeholder="Type your message" />
          <Button variant="primary" type="submit">Send</Button>
        </Form>


      </Container>
    );
  }

export default App;
