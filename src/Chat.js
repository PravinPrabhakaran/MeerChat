import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Chat(props) {
    
    return (
        <div>
            <h1>{props.userPrompt}</h1>
        </div>
    )
}

export default Chat

