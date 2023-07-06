import React, { useState } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages]  = useState([]);
  

  
  const promptChange = (event) => {
    setPrompt(event.target.value);
  };



  const submitPrompt = () => {
    if (prompt == '') {
      return;
    }
    const newMessage = [...messages, prompt]
    console.log(newMessage);
    setMessages(newMessage)
    setPrompt(""); // clear the message after logging it or using it
  };

  return (
    <Container>
    <Row>
      <h1>CTM-GPT</h1>
    </Row>
    <Form>
      <Row>
        <Container>
          {messages.map((message) => (
            <Chat userPrompt={message}/>
      ))}

        </Container>
      </Row>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Type your message" value={prompt} onChange={promptChange}/>
        </Col>
        <Col xs="auto">      
          <Button onClick={submitPrompt} variant="primary" type="button">Send</Button>
        </Col>
      </Row>
    </Form>
  </Container>
    );
  
}

export default App;
