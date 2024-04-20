"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterative_prompting_client_1 = require("iterative_prompting_client");
// Example usage
const client = new iterative_prompting_client_1.OpenAIClient({
    apiKey: 'sk-proj-KzQhweRWlz8MTgvZtlsMT3BlbkFJYiWvSH3DQXvH2yZoZua4',
    userId: 'user123',
    sessionId: 'session123',
});
async function runClient() {
    await client.registerUserSession();
    const gpt_confirmation_string = await client.initialPrompt("You are a professional web designer that only responds in html code. Give me exactly one html page based on my requests. Update the latest html page if I gave you extra feedback");
    const initial_page_string = await client.iterativePrompt("Give me a simple blank website home page");
    const page_string_title_updated = await client.iterativePrompt("Great. Now add in a title called e-commerce");
    const final_page_string = await client.iterativePrompt("Great. Now add in a login component");
    console.log('Chat History:', client.getPromptHistory(2));
}
runClient();
