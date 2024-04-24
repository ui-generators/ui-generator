import { OpenAIClient } from 'iterative_prompting_client';

export const client = new OpenAIClient({
    apiKey: 'enter-api-key',
    userId: 'user123',
    sessionId: 'session123',
});