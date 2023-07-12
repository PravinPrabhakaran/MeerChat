
//Imports express.js
const express = require('express')
const path = require('path');
const fs = require('fs');

//Makes an instance of the express application
const app = express();

const api_key = "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"

//Parses incoming JSON 
app.use(express.json());


function cleanInput(message) {
  try {
    const blacklistedWords = fs.readFileSync('./blacklistedWords.txt', 'utf8').split("\n");

    blacklistedWords.forEach((blacklistedWord)=> {
        const wordRegex = new RegExp(`\\b${blacklistedWord}\\b`, 'gi');
        message = message.replace(wordRegex, '*'.repeat(blacklistedWord.length));
    })
    return message;

  } catch (error) {
    console.error('Error reading text file:', error);
    return '';
  }
}



//Send message
app.post('/api/chat', async(request, response) => {

    try {
        
        var messages = request.body.map(({ from, content, ...item }) => { 
            return {
            ...item,
            role:item.role,
            content:cleanInput(content)
            };
        });
        console.log(messages)
        for (let i=0; i<messages.length; i+=2) {
            messages = [
                ...messages.slice(0, i),
                {
                    "role": "system",
                    "content": "You will be given a section of an insurance policy and must help users with questions they have about it. Keep an agent tone and do not give advice, be factual and stick to making the policy clearer only and do not stray from the topic. Only discuss aspects of the insurance policy"
    //                        "content": "You will be given a section of an insurance policy and must help users with questions they have about it. Keep an agent tone and do not give advice, be factual and stick to making the policy clearer only and do not stray from the topic. Only discuss aspects of the insurance policy"
                },
                ...messages.slice(i)

            ]
        }        
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
                        "content": "You will be given a section of an insurance policy and must help users with questions they have about it. Keep an agent tone and do not give advice, be factual and stick to making the policy clearer only and do not stray from the topic. Only discuss aspects of the insurance policy"
//                        "content": "You are a helpful assistant that helps users understand their insurance policies and must not stray from the topic."
                    },
                    ...messages
                ],
                max_tokens: 100 //Determines response length
            })
        })
    const data = await gptResponse.json();
    const reply = data.choices[0].message.content;

    
    response.json({reply})
    }
    catch (error) {
        console.error(error);
        response.status(500).json({error: 'Something went wrong'})
    }
});

app.get('/api/files/:name', (req, res) => {
    const { name } = req.params;
    const folderPath = path.join(__dirname, 'policies', name);
  
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