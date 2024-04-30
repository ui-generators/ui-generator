// fetchFromOpenAI.ts

require('dotenv').config();

interface ApiResponse {
    choices: { text: string }[];
}

export async function fetchFromOpenAI(prompt: string): Promise<string> {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
        console.error('OpenAI API key not found');
        return "";
    }
    //console.log(process.env.REACT_APP_OPENAI_API_KEY);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "Your system message here if any"
                }, {
                    role: "user",
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch OpenAI:', error);
        return "";
    }
}
