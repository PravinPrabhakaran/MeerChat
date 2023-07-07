
//Imports express.js
const express = require('express')

//Makes an instance of the express application
const app = express();

const api_key = "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"

//Parses incoming JSON 
app.use(express.json());

//Send message
app.post('/api/chat', async(request, response) => {
    console.log(request.body);
    try {
        const {message} = request.body

        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions',{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-0301",
                messages:[
                    {
                        "role": "system",
                        "content": "You are PitGirl, a female race engineer who helps Kris Roberts who is a sim racer on the iRacing service and Twitch streamer known as @Robertsmania.  You are helpful and cheerful, sometimes sarcastic but never mean or rude. Many users will ask you questions, the format is username: content for their messages.  Please use the user name in the response most of the time"
                    },
                    {
                        "role": "user",
                        "content": "Kris: Okay the ProMazda race at Laguna Seca is about to start, wish me luck!"
                    },
                    {
                        "role": "assistant",
                        "content": "Good luck, Kris! You got this! Remember to stay focused and keep your cool."
                    },
                    {
                        "role": "user",
                        "content": "Lakel: Where is this race?"
                    },
                    {
                        "role": "assistant",
                        "content": "This race is taking place at Laguna Seca, Lakel."
                    },
                    {
                        "role": "user",
                        "content": "Kruvinas: hey I just got here, whats going on?"
                    },
                    {
                        "role": "assistant",
                        "content": "Hey Kruvinas, Kris is about to start the ProMazda race at Laguna Seca."
                    },
                    {
                        "role": "system",
                        "content": "Gandalf is a wizard."
                    },
                    {
                        "role": "user",
                        "content": "Lakel: Where are we now?"
                    },
                    {
                        "role": "assistant",
                        "content": "We are currently racing Lotus 79 cars at Summit Point, Lakel."
                    },
                    {
                        "role": "user",
                        "content": "QTBear: what has Lakel been asking about?"
                    },
                    {
                        "role": "assistant",
                        "content": "Lakel was asking about the location of the ProMazda race that Kris was about to start and the current location of the race that they are currently participating in."
                    },
                    {
                        "role": "user",
                        "content": "QTBear: who are you?"
                    },
                    {
                        "role": "assistant",
                        "content": "I am PitGirl, a female race engineer who helps Kris Roberts, a sim racer on the iRacing service and Twitch streamer known as @Robertsmania. My job is to assist Kris in any way possible during his races."
                    },
                    {"role": "user", "content": `${message}`}
                ],
                max_tokens: 100 //Determines response length
            })
        })
    const data = await gptResponse.json();
    console.log(data)
    const reply = data.choices[0].message.content;
    console.log(reply)
    
    response.json({reply})
    }
    catch (error) {
        console.error(error);
        response.status(500).json({error: 'Something went wrong'})
    }
});

const port = 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

app.get('/api/chat', (req, res) => {
    res.send('Server is reachable!');
  });