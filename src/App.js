import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [messages, setMessages]  = useState([]);
  var [initial, setInitial] = useState(0)
  var [respond, setRespond] = useState(false)
  var [sections, setSections] = useState([]);
  var [currentContext, setCurrentContext] = useState(-1);
  const [systemMessages, setSystemMessages] = useState(["Enter the name of a provider"]);
  var [loading, setLoading]  = useState(false)
  var [loadingMessage, setLoadMsg]  = useState("Preparing your response")

  useEffect(()=> {
    if (respond === true) {
      gptResponse()
      setRespond(false)
    }
    // eslint-disable-next-line
  }, [respond])

  useEffect(() => {
    let intervalId;
  
    if (loading) {
      intervalId = setInterval(() => {
        setLoadMsg((prevLoadMsg) => {
          if (prevLoadMsg.length === 26) {
            return "Preparing your response";
          } else {
            return prevLoadMsg + ".";
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [loading]);


  var updateSectionContext = (index) => {
    setCurrentContext(index)
    setSystemMessages([...systemMessages, `You have selected ${sections[index].fileName.slice(0,-4)}, what would you like to discuss?`])
    setInitial(2)
  }


  const initialPhase = () => {
    
    if (initial === 1) {
      return (
        <Chat userPrompt={sections} user={"system"} setContext={updateSectionContext}/>
      )
    }
  }


  const gptResponse = async () => {
    setLoading(true);
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
    finally {
      setLoading(false);
    }   

  }


  const submitPrompt = () => {
    var prompt = document.getElementsByName("prompt")[0].value 
    var fromIndex = 0
    if (prompt === '') {
      return;
    }

    if (initial === 0) {
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
    else if (initial === 1) {
      return
    }
    else if (initial === 2) {
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
          {systemMessages.map((systemMsg, index) => (
            <Chat key={index} userPrompt={systemMsg} user={"assistant"}/>
          ))}

            
        {initialPhase()}
        {messages.map((messageRecord, index) => (
          <Chat key={index} userPrompt={messageRecord["content"]} user={messageRecord["role"]} from={messageRecord["from"]} />
        ))}

        {loading ? (
          <Chat userPrompt={loadingMessage} user={"assistant"}/>
        ) : null}

          </Container>
        </div>
      <div className="message-input">
  <Form>
    <Row className="input-row"> 
      <Col></Col>
      <Col xs={10}>
        <Form.Control className="form-control-lg" name="prompt" type="text" placeholder="Type your message" autoComplete="off" 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
          e.preventDefault();
          submitPrompt();
          document.getElementsByName("prompt")[0].value = ""
        }
  }}/>
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