"use client";

import React, { useState, useRef, useEffect } from "react";
import Form, { FormInput } from "@/components/form";
import { getSystemPrompt, getWebpagePrompt } from "@/app/prompt";
import { client } from "@/constants/api";
import P5Wrapper from "../components/p5Wrapper";
import Result from "@/components/result";
import Chat from "@/components/chat";
import { userName, systemName, workerName, Data } from "@/constants/data";
import { useAppDispatch } from "@/lib/hooks";
import { addChatHistory } from "@/lib/features/result/chat";

const Home: React.FC = () => {
    const [submitButtonLoading, setSubmitButtonLoading] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [useBootstrap, setUseBootstrap] = useState<boolean>(false);
    const resultRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = async (formInput: FormInput): Promise<void> => {
        setUseBootstrap(formInput.useBootstrap == "yes");

        setSubmitButtonLoading(true);

        const systemPrompt = getSystemPrompt(formInput.useBootstrap == "yes");
        await client.registerUserSession();
        await client.initialPrompt(systemPrompt);

        const webPagePrompt = getWebpagePrompt(formInput);
        const baseCode = await client.iterativePrompt(webPagePrompt);

        const blob = new Blob([baseCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const systemMessage: Data = {
            sender: systemName,
            message: systemPrompt,
        };
        const systemPayload = {
            chatMessage: systemMessage,
        };
        const userMessage: Data = {
            sender: userName,
            message: webPagePrompt,
        };
        const userPayload = {
            chatMessage: userMessage,
        };
        const workerMessage: Data = {
            sender: workerName,
            message: baseCode,
        };
        const workerPayload = {
            chatMessage: workerMessage,
        };
        dispatch(addChatHistory(systemPayload));
        dispatch(addChatHistory(userPayload));
        dispatch(addChatHistory(workerPayload));

        setCode(baseCode);
        setUrl(url);

        setSubmitButtonLoading(false);
    };

    useEffect(() => {
        if (resultRef.current) {
            const rect = resultRef.current.getBoundingClientRect();
            window.scrollTo({ top: rect.top + window.scrollY, behavior: "smooth" });
        }
    }, [code]);

    return (
        <div>
            <Form onSubmit={handleSubmit} submitButtonLoading={submitButtonLoading} />
            {code.length > 0 && <Result ref={resultRef} code={code} url={url} />}
            {code.length > 0 && <Chat onChangeCode={(code: string) => setCode(code)} onChangeUrl={(url: string) => setUrl(url)} code={code} useBootstrap={useBootstrap} />}
            <P5Wrapper />
        </div>
    );
};

export default Home;
