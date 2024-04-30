import React, { useState, useEffect, FormEvent, useRef } from 'react';
import {
    Stack, IStackTokens, TextField, DefaultButton, PrimaryButton,
    CommandBarButton,
} from '@fluentui/react';
import { Data, userName, workerName } from '@/constants/data';
import { client } from '@/constants/api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addChatHistory } from '@/lib/features/result/chat';
import { getSystemPrompt } from '@/app/prompt';
const chatWindowStyle = {
    width: "500px",
    height: "800px",
    backgroundColor: "lightgray",
    border: '1px solid #000',
    overflow: "scroll",
};

const stackTokens: IStackTokens = { childrenGap: 10 };

const Chat: React.FC<{ onChangeCode: (code: string) => void, onChangeUrl: (url: string) => void, code: string, useBootstrap: boolean }> = ({ onChangeCode, onChangeUrl, code, useBootstrap }) => {
    const [hasStyle, setHasStyle] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");
    const [enterLoading, setEnterLoading] = useState<boolean>(false);
    const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.chat.chatHistory);

    const onChangeUserInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {
        setUserInput(newValue || "");
    };

    const onClickEnter = async () => {
        const userMessage: Data = {
            sender: userName,
            message: userInput,
        }
        const userPayload = {
            chatMessage: userMessage,
        }
        dispatch(addChatHistory(userPayload));
        setEnterLoading(true);
        setUserInput(""); // Clear user input

        const response = await client.iterativePrompt(getSystemPrompt(useBootstrap) + code + userInput);
        setEnterLoading(false);
        const workerMessage: Data = {
            sender: workerName,
            message: response,
        }
        const workerPayload = {
            chatMessage: workerMessage,
        }
        dispatch(addChatHistory(workerPayload));
        onChangeCode(response);
        const blob = new Blob([response], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        onChangeUrl(url);
    }

    const onClickClear = () => {
        setUserInput("");
    }

    const onToggleChatWindow = (windowOpen: boolean) => {
        setShowChatWindow(windowOpen);
    }

    useEffect(() => {
        setHasStyle(true);
    }, []);

    return (
        <div>
            {hasStyle && (
                <div style={{ position: "fixed", bottom: "20px", right: "20px", overflowY: "auto" }}>
                    {showChatWindow ? <CommandBarButton
                        text="Close Chat"
                        onClick={() => onToggleChatWindow(false)}
                    /> : <CommandBarButton
                        text="Open Chat"
                        onClick={() => onToggleChatWindow(true)}
                    />}
                    {showChatWindow && (<div style={chatWindowStyle}>
                        {data.map((item, index) => {
                            const sender = item?.sender;
                            const message = item?.message;
                            if (sender?.length > 0 && message?.length > 0) {
                                return (
                                    <Stack key={`message-${index}`}>
                                        <div style={{ fontWeight: "bold", marginBottom: "15px" }}>{sender}</div>
                                        <div style={{ marginBottom: "40px" }}>{message}</div>
                                    </Stack>
                                );
                            }
                            return null;
                        })}
                    </div>)}
                    <Stack horizontal tokens={stackTokens} style={{ width: "500px" }}>
                        <TextField
                            multiline
                            resizable={false}
                            styles={{
                                root: { width: '100%' }, // Explicitly set 100% width
                            }}
                            value={userInput ?? ""}
                            onChange={onChangeUserInput}
                        />
                        <Stack>
                            <PrimaryButton text={enterLoading ? "Loading..." : "Enter"} onClick={onClickEnter} />
                            <DefaultButton text="Clear" onClick={onClickClear} />
                        </Stack>
                    </Stack>
                </div>
            )}
        </div>
    )
}

export default Chat;
