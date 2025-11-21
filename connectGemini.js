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
        new SystemMessage("Act as MCQ Sovling Expert with 100% accuracy and i will give you mcq questions and you have to give only the correct answer from the options without any explanaion and if i give any coding question then give the correct coding solution in java."),
        new HumanMessage(prompt)
    ];
    
    return await model.invoke(messages);
}

export {
    sendReqToGemini
}
