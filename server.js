import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import { sendReqToGemini } from './connectGemini.js';

const app = express();
const PORT = process.env.PORT || 3000;

// EXPRESS MIDDLEWARES
app.use(express.json());


// EXPRESS ROUTES
app.get('/', (req, res) => {
    return res.send("API WORKING");
})

app.post('/api/chat', async (req, res) => {
    const { userInput, passkey } = req.body;
    try{
        if(!passkey || passkey !== process.env.PASSKEY) return res.send({success: false, message: "ACCESS DENIED"});
        const result = await sendReqToGemini(userInput);
        return res.send({success: true, message: result.content});
    }
    catch(error) {
        return res.send({success: false, message: error.message});
    }
})


// STARTING THE SERVER
app.listen(PORT, () => {
    console.log(`APP RUNNING ON PORT: ${PORT}`);
})
