import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SergeiImage from './sergei.png';
import AlekImage from './alek.png';

function App() {

  const [messages, setMessages]  = useState([]);
  var [initial, setInitial] = useState(0)
  var [respond, setRespond] = useState(false)
  var [sections, setSections] = useState([]);
  var [currentContext, setCurrentContext] = useState(-1);
  const [systemMessages, setSystemMessages] = useState(["Enter the name of a provider"]);


  useEffect(()=> {
    if (respond == true) {
      gptResponse()
      setRespond(false)
    }
  }, [respond])

  var updateSectionContext = (index) => {
    setCurrentContext(index)
    setSystemMessages([...systemMessages, `You have selected ${sections[index].fileName.slice(0,-4)}, what would you like to discuss?`])
    setInitial(2)
  }


  const initialPhase = () => {
    
    if (initial == 1) {
      return (
        <Chat userPrompt={sections} user={"system"} setContext={updateSectionContext}/>
      )
    }
  }


  const gptResponse = async () => {
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

      setMessages(messages => [...messages, {role:"assistant", content:reply, from:0}]);


    }
  
  catch (error) {
    console.error(error)
  }
  }   


  const submitPrompt = () => {
    var prompt = document.getElementsByName("prompt")[0].value 
    var fromIndex = 0
    if (prompt === '') {
      return;
    }

    if (initial == 0) {
      fetch('/api/files/' + prompt)
        .then(response => response.json())
        .then(data => {
          setInitial(1)
          setSections(data.files)
        })
        .catch(error => {
          setSystemMessages([...systemMessages, "That is incorrect, please retry"])
          console.error(error);
          return;
        });
      return
    }
    else if (initial == 1) {
      return
    }
    else if (initial == 2) {
      var temp = `${sections[currentContext].content}. Use the information provided above only when answering any questions you receive.`
      fromIndex = temp.length + 1
      prompt = `${temp} ${prompt}` 
      console.log(prompt)
      setInitial(3)
    }
    


    //messages.push({role:"user", content:prompt})
    setMessages(messages=>[...messages, {role:"user", content:prompt, from:fromIndex}]);
    setRespond(true)
    console.log(messages)
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
        {systemMessages.map((systemMsg) => (
          <Chat userPrompt={systemMsg} user={"assistant"}/>
        ))}
            
        {initialPhase()}
        {messages.map((messageRecord) => (
            <Chat userPrompt={messageRecord["content"]} user={messageRecord["role"]} from={messageRecord["from"]} />
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
