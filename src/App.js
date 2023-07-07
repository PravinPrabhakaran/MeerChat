import React, { useState } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  
  const [messages, setMessages]  = useState([["Asdasdoaskdoaskdasd", false]]);
  

  const gptResponse = async (prompt) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({prompt}),
      })
      
      if (!response.ok) {
        console.error('Error sending message');
      }
  
      const data = await response.json();
      const reply = data.reply;
  
      const newMessage = [...messages, [reply, false]]
      setMessages(newMessage)
    }
  
  catch (error) {
    console.error(error)
  }
  }   



  const submitPrompt = () => {
    var prompt = document.getElementsByName("prompt")[0].value 
    if (prompt == '') {
      return;
    }

    const newMessage = [...messages, [prompt,true]]
    setMessages(newMessage)

    gptResponse(prompt)


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
