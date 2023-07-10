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
    console.log(props.user)
    if (props.user == "system") {
        console.log(props.userPrompt)
        return (
            <div className={messageClass}>
                <h1 style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{person} </h1>
                {(props.userPrompt).map((section) => (
                    <span>
                    <a href="#" style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{section.fileName.slice(0,-4)}</a>
                    <br></br>
                    </span>
                ))}
            </div>
        )
    }

    console.log(34343434)

    return (
        <div className={messageClass}>
            <h1 style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{person} {props.userPrompt}</h1>
        </div>
    )
}

export default Chat

