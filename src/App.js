import React, { useState } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [messages, setMessages]  = useState([["Asdasdoaskdoaskdasd", false]]);
  
  const submitPrompt = () => {
    var prompt = document.getElementsByName("prompt")[0].value 
    console.log(prompt)
    if (prompt == '') {
      return;
    }

    const newMessage = [...messages, [prompt,true]]
    setMessages(newMessage)
    

    document.getElementsByName("prompt")[0].value = ""
    // clear the message after logging it or using it
  };

  
  return (
    <Container>
      <Row>
        <h1>CTM-GPT</h1>
      </Row>
      <Form>
        <Container>
          {messages.map((message, key) => (
            <Chat userPrompt={message[0]} user={message[1]} />
          ))}
        </Container>
        <Row>
          <Col>
            <Form.Control name="prompt" type="text" placeholder="Type your message"/>
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
