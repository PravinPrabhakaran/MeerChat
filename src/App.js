import React, { useState } from 'react';
import TextArea from './TextArea'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState("");
  
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    console.log(message);
    setMessage(""); // clear the message after logging it or using it
  };

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
          <Form.Control type="text" placeholder="Type your message" value={message} onChange={handleInputChange}/>
        </Col>
        <Col xs="auto">      
          <Button onClick={handleClick} variant="primary" type="button">Send</Button>
        </Col>
      </Row>
    </Form>
  </Container>
    );
  }

export default App;
