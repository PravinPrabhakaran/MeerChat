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
    <Form>
      <Row>
        <TextArea />
      </Row>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Type your message" />
        </Col>
        <Col xs="auto">      
          <Button variant="primary" type="submit">Send</Button>
        </Col>
      </Row>
    </Form>
  </Container>
    );
  }

export default App;
