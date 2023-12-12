const express = require('express');
const app = express();
const port = 4000;
app.use(express.static(__dirname)); 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const OpenAI = require("openai");
const cors = require('cors');
require('dotenv').config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
  })

app.post('/generate-points', async (req, res) => {
    var title = req.body.roleName;
    var description = req.body.roleDescription;
    res.json(await gpt(title, description))
    
  });

async function gpt(role, accomp) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a job search expert and a seasoned recruiter. Based on the following job title and list of achievements in the role, come up with 2 strong bullet points (double line sentence is preferred) for the role. The bullet points shoud be coherent and adequately describe the candidate's capabilities. " + role + ": " + accomp + "make sure to keep all the quantitative metrics and role specific terminology used in the description."}],
      model: "gpt-4-0314",
    });
  
    //console.log(completion.choices[0]);
    return completion.choices[0]?.message?.content;
  } 