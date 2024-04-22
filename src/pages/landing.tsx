"use client";

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppStore } from '../lib/hooks';
import Form, { FormInput } from '../components/form';
import { Link } from '@fluentui/react';
import { setPageContent } from '@/lib/features/result/content';

const Home: React.FC = () => {
    const [indices, setIndices] = useState<number[]>([]);
    // const [blobUrls, setBlobUrls] = useState<string[]>([]);
    const store = useAppStore();

    const handleSubmit = async (formInput: FormInput): Promise<void> => {
        // doing simple generation using only some of the user inputs for placeholder purposes
        const baseCode = `<html><body style="background-color:${formInput.colorScheme};"><h1>${formInput.pageTitle}</h1><p>${formInput.content}</p></body></html>`;
        const variations = [
            baseCode,
            `${baseCode}<style>body {font-family: Arial;}</style>`,
            `${baseCode}<footer><p>Third link here...</p></footer>`
        ];

        const curIndices: number[] = [];

        variations.forEach((code, index) => {
            const payload = {
                code,
                index,
            }
            store.dispatch(setPageContent(payload));
            curIndices.push(index);
        });

        setIndices(curIndices);
    };

    const onClickLink = (index: number) => {
        window.open(`/output?index=${index}`);
    };

    useEffect(() => {
        console.log("Well " + JSON.stringify(store.getState()));
    }, [store]);

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
