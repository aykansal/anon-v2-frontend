require("dotenv").config();
import express from "express";
import Groq from "groq-sdk";

import OpenAI from "openai";


import Anthropic from "@anthropic-ai/sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { ContentBlock, TextBlock } from "@anthropic-ai/sdk/resources";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";

// const anthropic = new Anthropic();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const openai = new OpenAI({
    apiKey: "xai-cdYuTWv6FRaqO0cZYGpJ8RNvu0jcGle5RrHTteJmtJkUzY12PdCS1VLkmLCIkk9CqcSmtobWk2vxbwmQ",
    baseURL: "https://api.x.ai/v1",
  });

  const anthropic = new Anthropic({
    apiKey: "xai-cdYuTWv6FRaqO0cZYGpJ8RNvu0jcGle5RrHTteJmtJkUzY12PdCS1VLkmLCIkk9CqcSmtobWk2vxbwmQ",
    baseURL: "https://api.x.ai/",
  });
  
const app = express();
app.use(cors())
app.use(express.json())

app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: prompt },
                { 
                    role: "system", 
                    content: "Analyze the given project description. If the description explicitly mentions 'backend' or 'node', respond with 'node'. Otherwise, respond with 'react'. Only return a single word: either 'node' or 'react'. Do not include any additional text or explanations."
                }
            ],
            model: "llama3-8b-8192",
        });

        const answer = completion.choices?.[0]?.message?.content?.trim().toLowerCase();

        if (answer === "react") {
            res.json({
                ans: "react",
                prompts: [
                    BASE_PROMPT, 
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (answer === "node") {
            res.json({
                ans: "node",
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(400).json({ message: "Invalid response from AI. Expected 'node' or 'react'." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/chat", async (req, res) => {


    const messages = req.body.messages;
    const response = await anthropic.messages.create({
        model: 'grok-beta',
        messages: messages,
        max_tokens: 8000,
        system: getSystemPrompt()
    })


    // const response = await groq.chat.completions.create({
    //     messages: [
    //         ...messages, 
    //         { role: "system", content: getSystemPrompt() }
    //     ],
    //     model: "llama3-8b-8192"
    // });

    // const response = await anthropic.messages.create({
    //     messages: messages,
    //     model: 'claude-3-5-sonnet-20241022',
    //     max_tokens: 8000,
    //     system: getSystemPrompt()
    // })

    // const response = await openai.chat.completions.create({
    //     model: "grok-beta",
    //     messages: messages,
    //   });

    console.log(response);

    res.json({
        response: (response.choices.[0] as TextBlock)?.text
    });
})






app.listen(3000);



// export async function main() {
//     const chatCompletion = await getGroqChatCompletion();
//     console.log(chatCompletion.choices[0]?.message?.content || "");
//   }
  
//   export async function getGroqChatCompletion() {
//     return groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: "Explain the importance of fast language models",
//         },
//       ],
//       model: "llama3-8b-8192",
//     });
// }

