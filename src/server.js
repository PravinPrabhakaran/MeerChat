
//Imports express.js
const express = require('express')
const path = require('path');
const fs = require('fs');

//Makes an instance of the express application
const app = express();

const api_key = "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"

//Parses incoming JSON 
app.use(express.json());

//Send message
app.post('/api/chat', async(request, response) => {

    try {
        console.log(request.body)
        const messages = request.body
        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions',{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages:[
                    {
                        "role": "system",
                        "content": "You are DesignGPT helpful assistant graphics design chatbot"
                    },
                    ...messages
                ],
                max_tokens: 100 //Determines response length
            })
        })
    const data = await gptResponse.json();
    //console.log(data)
    const reply = data.choices[0].message.content;
    //console.log(reply)
    
    response.json({reply})
    }
    catch (error) {
        console.error(error);
        response.status(500).json({error: 'Something went wrong'})
    }
});

app.get('/api/files/:name', (req, res) => {
    const { name } = req.params;
    console.log(name)
    console.log(__dirname)
    const folderPath = path.join(__dirname, 'policies', name);
    console.log(folderPath)
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read folder' });
      }
  
      const textFiles = files.filter(file => path.extname(file) === '.txt');
      const fileData = [];
  
      textFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        fileData.push({ fileName: file, content: fileContent });
      });
  
      res.json({ files: fileData });
    });
  });




const port = 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})







app.get('/api/chat', (req, res) => {
    res.send('Server is reachable!');
  });