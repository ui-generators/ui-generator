"use client";

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/hooks';
import Form, { FormInput } from '@/components/form';
import { Link } from '@fluentui/react';
import { getSystemPrompt, getWebpagePrompt } from '@/app/prompt';
import { fetchFromOpenAI } from '@/app/fetchFromOpenAI';
import { OpenAIClient } from 'iterative_prompting_client';


const client = new OpenAIClient({
    apiKey: 'put your api here',
    userId: 'user123',
    sessionId: 'session123',
});


const Home: React.FC = () => {
    const [indices, setIndices] = useState<number[]>([]);
    // const [blobUrls, setBlobUrls] = useState<string[]>([]);
    const store = useAppStore();

    const handleSubmit = async (formInput: FormInput): Promise<void> => {

        const gpt_confirmation_string = await client.initialPrompt(getSystemPrompt());

        const baseCode = await client.iterativePrompt(getWebpagePrompt(formInput));
        const variation_1 = await client.iterativePrompt(getWebpagePrompt(formInput));
        const variation_2 = await client.iterativePrompt(getWebpagePrompt(formInput));

        const variations = [
            baseCode,
            variation_1,
            variation_2
        ];

        const curIndices: number[] = [];

        variations.forEach((code, index) => {
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const data = {
                code,
                url,
            };
            localStorage.setItem(String(index), JSON.stringify(data));
            curIndices.push(index);
        });

        setIndices(curIndices);
    };

    const onClickLink = (index: number) => {
        window.open(`/output?index=${index}`);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} />
            {indices.map((index) => (
                <Link key={index} onClick={() => onClickLink(index)} style={{ display: 'block', margin: '10px' }}>
                    Preview {index + 1} (New Tab)
                </Link>
            ))}
        </div>
    );
};

export default Home;
