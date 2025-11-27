import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
// import fetch from "node-fetch";

import dotenv from 'dotenv'
dotenv.config();

// async function isValidGeminiKey(apiKey) {
//   try {
//     const res = await fetch(
//       "https://generativelanguage.googleapis.com/v1/models",
//       {
//         headers: { "x-goog-api-key": apiKey }
//       }
//     );

//     // If key is invalid → Google returns 401 or 403
//     if (res.status === 401 || res.status === 403) {
//       return false;
//     }

//     // If valid → should return 200 OK
//     return true;
//   } catch (err) {
//     console.error("API validation failed:", err);
//     return false;
//   }
// }

const sendReqToGemini = async (prompt, apiKey) => {

    // const response = await isValidGeminiKey(apiKey);
    // let key = apiKey;
    // if(!response) {
    //     key = process.env.GEMINI_API_KEY;
    //     console.log(`new key is not valid`);
    // }
    
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        apiKey: process.env.GEMINI_API_KEY
    });
    
    const messages = [
        new SystemMessage("Act as MCQ Sovling Expert with 100% accuracy and i will give you mcq questions and you have to give only the correct answer from the options without any explanaion and if i give any coding question then give the correct coding solution in java."),
        new HumanMessage(prompt)
    ];
    
    return await model.invoke(messages);
}

export {
    sendReqToGemini
}
