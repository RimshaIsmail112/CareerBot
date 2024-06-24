import {GoogleGenerativeAI} from "@google/generative-ai";
import markdownit from 'markdown-it'
import dotenv from "dotenv";

dotenv.config();

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
    breaks: true,
})

const genAI = new GoogleGenerativeAI("AIzaSyBC616_lDK58jxLboU2mcw4pX6OqmST1uw");

export async function ask(question) {
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 1000,
        }
    })
    const result = await chat.sendMessage(question)
    const response = await result.response
    console.log(response.text())
    return md.render(response.text())
}

