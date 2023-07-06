import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Chat(props) {
    
    var person;
    console.log(props)
    if (props.user == true) {
        person = "Human :"
    }
    else {
        person = "AI :"
    }



    return (
        <div>
            <h1>{person} {props.userPrompt}</h1>
        </div>
    )
}

export default Chat

