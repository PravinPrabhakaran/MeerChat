
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

        const gptResponse = await fetch('https://api.openai.com/v1/completions',{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 100 //Determines response length
            })
        })
    const data = await gptResponse.json();
    console.log(data)
    const reply = data.choices[0].text.trim()
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