import { OpenAIClient } from 'iterative_prompting_client';

export const client = new OpenAIClient({
    apiKey: 'your api here',
    userId: 'user123',
    sessionId: 'session123',
});