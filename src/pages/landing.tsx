"use client";

import React, { useState, useEffect } from 'react';
import Form, { FormInput } from '@/components/form';
import { Link } from '@fluentui/react';
import { getSystemPrompt, getWebpagePrompt } from '@/app/prompt';
import { client } from '@/constants/api';
import P5Wrapper from '../components/p5Wrapper';

const Home: React.FC = () => {
    const [indices, setIndices] = useState<number[]>([]);
    const [submitButtonLoading, setSubmitButtonLoading] = useState<boolean>(false);

    const handleSubmit = async (formInput: FormInput): Promise<void> => {

        setSubmitButtonLoading(true);

        const systemPrompt = getSystemPrompt();
        await client.initialPrompt(systemPrompt);

        const webPagePrompt = getWebpagePrompt(formInput);

        const baseCode = await client.iterativePrompt(webPagePrompt);
        const variation_1 = await client.iterativePrompt(webPagePrompt);
        const variation_2 = await client.iterativePrompt(webPagePrompt);

        const variations = [
            baseCode,
            variation_1,
            variation_2
        ];

        localStorage.setItem("systemPrompt", systemPrompt);
        localStorage.setItem("webpagePrompt", webPagePrompt);

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
        setSubmitButtonLoading(false);
    };

    const onClickLink = (index: number) => {
        window.open(`/output?index=${index}`);
    };

    return (
        <div>
            <P5Wrapper />
            <Form onSubmit={handleSubmit} submitButtonLoading={submitButtonLoading} />
            {indices.map((index) => (
                <Link key={index} onClick={() => onClickLink(index)} style={{ display: 'block', margin: '10px' }}>
                    Preview {index + 1} (New Tab)
                </Link>
            ))}
        </div>
    );
};

export default Home;
