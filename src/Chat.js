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


    var returnSection = (index) => {
        return (e) => {
            console.log(index);
            e.preventDefault();
            props.setContext(index);
        };
    };

    const messageClass = props.user === "user" ? "user-message" : "bot-message";
    if (props.user === "system") {
        console.log(props.userPrompt)
        return (
            <div className={messageClass}>
                <h1 style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{person} </h1>
                {(props.userPrompt).map((section, index) => (
                  <span key={index}>
                    <button onClick={returnSection(index)} style={{ fontSize: '24px', textAlign: 'left', paddingLeft: '1em', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                        {section.fileName.slice(0,-4)}
                    </button>
                    <br></br>
                  </span>
                ))}

            </div>
        )
    }

    return (
        <div className={messageClass}>
            <h1 style= {{ fontSize: '24px', textAlign: 'left' , paddingLeft: '1em' }} >{person} {props.userPrompt.slice(props.from, props.userPrompt.length)}</h1>
        </div>
    )
}

export default Chat

