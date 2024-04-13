// fetchFromOpenAI.ts



interface ApiResponse {
    choices: { text: string }[];
}

export async function fetchFromOpenAI(prompt: string): Promise<string> {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 1000,
            temperature: 0.1
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch from OpenAI');
    }

    const data: ApiResponse = await response.json();
    return data.choices[0].text;
}
