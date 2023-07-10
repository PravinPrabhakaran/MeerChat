import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';

function Chat(props) {
    
    var person;
    
    if (props.user === "user") {
        person = "Human :"
    }
    else {
        person = "AI :"
    }

    const messageClass = props.user == "user" ? "user-message" : "bot-message";

    return (
        <div className={messageClass}>
            <h1 style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{person} {props.userPrompt}</h1>
        </div>
    )
}

export default Chat

