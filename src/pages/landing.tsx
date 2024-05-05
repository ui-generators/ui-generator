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
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Define the Home component
const Home: React.FC = () => {
  

    // Define the state variables
    const [submitButtonLoading, setSubmitButtonLoading] =
    useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [useBootstrap, setUseBootstrap] = useState<boolean>(false);
    // Define a ref for the result div
    const resultRef = useRef<HTMLDivElement>(null);
    // Get the dispatch function from Redux store
    const dispatch = useAppDispatch();
    const router = useRouter();


    // Get the current user
    const { userId } = useAuth();

    // Check if the user is logged in
    if (!userId) {
        return (
            <>
                <div>404 Error</div>
            </>
        );
    }

    // Define the submit handler for the form
    const handleSubmit = async (formInput: FormInput): Promise<void> => {

        // Set the query state based on the form input
        setQuery(formInput.content);

        // Update the useBootstrap state based on the form input
        setUseBootstrap(formInput.useBootstrap == "yes");

        // Set the submit button loading state
        setSubmitButtonLoading(true);

        // Get the system prompt based on whether Bootstrap is used
        const systemPrompt = getSystemPrompt(formInput.useBootstrap == "yes");
        // Register a new user session with the API client
        await client.registerUserSession();
        // Send the initial prompt to the API client
        await client.initialPrompt(systemPrompt);

        // Send the webpage prompt to the API client and get the base code
        const webPagePrompt = getWebpagePrompt(formInput);
        const baseCode = await client.iterativePrompt(webPagePrompt);

        // Create a new Blob object representing the base code as text/html
        const blob = new Blob([baseCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        try {
            const body = { userId, query, code };
            await fetch("/api/interface", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            router.push("/");
        } catch (error) {
            console.error(error);
        }

        // Create the chat history entries for the system, user, and worker

        // Create a system message object
        const systemMessage: Data = {
            sender: systemName,
            message: systemPrompt,
        };
        // Create a payload object for the system message
        const systemPayload = {
            chatMessage: systemMessage,
        };

        // Create a user message object
        const userMessage: Data = {
            sender: userName,
            message: webPagePrompt,
        };

        // Create a payload object for the user message
        const userPayload = {
            chatMessage: userMessage,
        };

        // Create a worker message object
        const workerMessage: Data = {
            sender: workerName,
            message: baseCode,
        };

        // Create a payload object for the worker message
        const workerPayload = {
            chatMessage: workerMessage,
        };

        // Dispatch actions to add the system, user, and worker messages to the chat history
        dispatch(addChatHistory(systemPayload));
        dispatch(addChatHistory(userPayload));
        dispatch(addChatHistory(workerPayload));

        // Update the code and url state with the base code and url
        setCode(baseCode);
        setUrl(url);

        // Set the submit button loading state
        setSubmitButtonLoading(false);
    };

    // Define a useEffect hook that scrolls to the result div when the code changes
    useEffect(() => {
        if (resultRef.current) {
            const rect = resultRef.current.getBoundingClientRect();
            window.scrollTo({ top: rect.top + window.scrollY, behavior: "smooth" });
        }
    }, [code]);

    // Render the component
    return (
        <div>
            <Form onSubmit={handleSubmit} submitButtonLoading={submitButtonLoading} />
            {code.length > 0 && <Result ref={resultRef} code={code} url={url} />}
            {code.length > 0 && (
                <Chat
                    onChangeCode={(code: string) => setCode(code)}
                    onChangeUrl={(url: string) => setUrl(url)}
                    code={code}
                    useBootstrap={useBootstrap}
                />
            )}
            <P5Wrapper />
        </div>
    );
};

export default Home;
