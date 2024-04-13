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

const genAI = new GoogleGenerativeAI("AIzaSyAofrrLkJCAsl2O8HRQalb93dqjSq50fCs");

export async function ask(question) {
    const model = genAI.getGenerativeModel({model: 'gemini-pro'})
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

