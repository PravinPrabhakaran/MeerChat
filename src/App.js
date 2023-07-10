import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SergeiImage from './sergei.png';
import AlekImage from './alek.png';

function App() {

  const [messages, setMessages]  = useState([
    {role:"user", content:"Where was it played?"},
    {role:"assistant", content:"Wembley Stadium"}
  ]);
  
  var [respond, setRespond] = useState(false)

  useEffect(()=> {
    if (respond == true) {
      gptResponse()
      setRespond(false)
    }
  }, [respond])





  const gptResponse = async () => {
    console.log(messages)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(messages),
      })
      
      if (!response.ok) {
        console.log(response)
        console.error('Error sending message');
      }
  
      const data = await response.json();
      const reply = data.reply;

      setMessages(messages => [...messages, {role:"assistant", content:reply}]);


    }
  
  catch (error) {
    console.error(error)
  }
  }   


  const submitPrompt = () => {
    var prompt = document.getElementsByName("prompt")[0].value 

    if (prompt === '') {
      return;
    }
    
    //messages.push({role:"user", content:prompt})
    setMessages(messages=>[...messages, {role:"user", content:prompt}]);
    setRespond(true)

    document.getElementsByName("prompt")[0].value = ""
    // clear the message after logging it or using it
  };

  return (
    <Container>
      <Row>
        <h1>CTM-GPT</h1>
      </Row>
      <div className="images-container">
        {/* <img src={SergeiImage} alt="Sergei" className="image" />
        <img src={AlekImage} alt="Alek" className="image" /> */}
      </div>
        <div className="messages-container">
          <Container>
        {messages.map((messageRecord) => (
            <Chat userPrompt={messageRecord["content"]} user={messageRecord["role"]}/>
        ))}
          </Container>
        </div>
      <div className="message-input">
  <Form>
    <Row noGutters className="input-row"> 
      <Col></Col>
      <Col xs={6}>
        <Form.Control name="prompt" type="text" placeholder="Type your message" autoComplete="off"/>
      </Col>
      <Col xs="auto">
        <Button onClick={submitPrompt} variant="primary" type="button">Send</Button>
      </Col>
      <Col></Col>
    </Row>
  </Form>
</div>
    </Container>
  );

 
  

}





export default App;
