"use client";

import React, { useState } from 'react';
import { useAppStore } from '../lib/hooks';
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
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const data = {
                code,
                url,
            };
            localStorage.setItem(String(index), JSON.stringify(data));
            // console.log("localstorage " + localStorage.getItem(String(index)));
            curIndices.push(index);
        });

        setIndices(curIndices);
    };

    const onClickLink = (index: number) => {
        window.open(`/output?index=${index}`);
    };

    // useEffect(() => {
    //     console.log("Well " + JSON.stringify(store.getState()));
    // }, [indices]);

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
