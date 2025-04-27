import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

import dotenv from 'dotenv'
dotenv.config();

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const sendReqToGemini = async (prompt) => {
    const messages = [
        new SystemMessage("Act as a python expert and i will give you two type of questions one will be mcq you must give the correct answer of the mcq and other is progrmming question for this you must give the correct code in python without comments"),
        new HumanMessage(prompt)
    ];
    
    return await model.invoke(messages);
}

export {
    sendReqToGemini
}