"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterative_prompting_client_1 = require("iterative_prompting_client");
// Custom prompting pipeline
async function runClient() {
    // GPT setup prompt
    const gpt_confirmation_string = await client.initialPrompt(`
        You are a professional web designer that only responds in html code. 
        Give me exactly one html page based on my requests. 
        Update the latest html page if I gave you extra feedback
    `);
    // These will be pure html strings that can be served directly to front end and display
    const initial_page_string = await client.iterativePrompt("Give me a simple blank website home page");
    const page_string_title_updated = await client.iterativePrompt("Great. Now add in a title called e-commerce");
    const final_page_string = await client.iterativePrompt("Great. Now add in a login component");
    console.log('Chat History:', client.getPromptHistory(2)); // Get last 2 prompt history entry: Last Human prompt and last AI response
    console.log('Webpage History:', client.getPageHistory(2)); // Get last 2 web page generated by chatgpt
}
// Example usage
const client = new iterative_prompting_client_1.OpenAIClient({
    apiKey: 'dummy-api-key',
    userId: 'user123',
    sessionId: 'session123',
});
runClient();
