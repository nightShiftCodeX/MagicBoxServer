import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import { sendReqToGemini } from './connectGemini.js';
import mongoose from 'mongoose';
import User from './User.js';


const app = express();
const PORT = process.env.PORT || 3000;


// CONNECTING DATABASE
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((error) => {
    console.log(error);
})


// EXPRESS MIDDLEWARES
app.use(express.json());


// EXPRESS ROUTES
app.get('/', (req, res) => {
    return res.send("API WORKING");
})

app.post('/api/user', async (req, res) => {
    const { name, deviceId } = req.body;
    try {
        const user = new User({name, deviceId});
        await user.save();
        return res.send({success: true, message: "USER CREATED", user: user});
    }
    catch(error) {
        console.log(error);
        return res.send({success: false, message: error.message});
    }

})

app.delete('/api/user', async (req, res) => {
    const { deviceId } = req.body;
    try {
        const user = await User.deleteOne({deviceId});
        return res.send({success: true, message: "USER DELETED", user: user});
    }
    catch(error) {
        console.log(error);
        return res.send({success: false, message: error.message});
    }
})

app.post('/api/chat', async (req, res) => {
    const { userInput, passkey, deviceId } = req.body;
    try{
        // console.log(`deviceId`, deviceId);
        // const device = await User.findOne({deviceId});
        // if(!device) return res.send({success: false, message: "ACCESS DENIED"});
        if(!passkey || passkey !== process.env.PASSKEY) return res.send({success: false, message: "INVALID PASSKEY"});
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
