import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-4.1",
  input: "what ai model am i talking to?",
});

console.log(response.text_output);
