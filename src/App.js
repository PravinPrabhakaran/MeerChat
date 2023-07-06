import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Container>
        <Row>
            <h1>CTM-GPT</h1>
        </Row>
        <Row>
          <textArea />
        </Row>
        
        <Form className="d-flex">
          <Form.Group>
          <Form.Control type="text" placeholder="Type your message" />
          </Form.Group>

          <Button variant="primary" type="submit">Send</Button>

        </Form>


      </Container>
    );
  }

export default App;
