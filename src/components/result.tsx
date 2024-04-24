// TODO: Render web page in a component
import React, { useState, useEffect, useRef } from 'react';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { useRouter } from 'next/router';
import Chat from '@/components/chat';
import { userName, workerName, systemName } from '@/constants/data';
import { useAppStore, useAppDispatch } from '@/lib/hooks';
import { addChatHistory } from '@/lib/features/result/chat';
import { Data } from '@/constants/data';

const toggleStyles: IToggleStyles = {
    root: {
        alignItems: 'right',
        backgroundColor: 'lightgray',
        border: '1px solid gray',
        borderRadius: '4px',
        padding: '8px',
    },
    thumb: {
        backgroundColor: 'blue', // Color of the thumb
    },
    pill: {
        backgroundColor: 'gray',
    },
    container: {

    },
    text: {

    },
    label: {
        fontWeight: 'bold',
    },
};


const Result: React.FC<{}> = () => {
    const [isWebPage, setIsWebPage] = useState<boolean>(true);
    const [hasStyle, setHasStyle] = useState<boolean>(false);
    const router = useRouter();
    const { index } = router.query;
    const [code, setCode] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const webPageRef = useRef<HTMLIFrameElement | null>(null);
    const [webPageHeight, setWebPageHeight] = useState("300px");
    const dispatch = useAppDispatch();

    const handleToggleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        if (checked != undefined) {
            setIsWebPage(checked);
        }
    };

    // Reference: https://stackoverflow.com/questions/67218249/automatically-adjust-height-of-iframe-using-react-hooks
    const onLoad = () => {
        if (webPageRef?.current?.contentWindow) {
            setWebPageHeight(webPageRef.current.contentWindow.document.body.scrollHeight + "px");
        }
    };

    // This useEffect hook ensures that the styles of the toggle are applied after the
    // component is fully rendered
    useEffect(() => {
        setHasStyle(true);
    }, []);

    const store = useAppStore();

    useEffect(() => {
        if (index?.length && index.length > 0) {
            const valueInStorage = localStorage.getItem(String(index));
            if (valueInStorage != null && valueInStorage.length > 0) { // Check if value in storage is empty string or undefined
                const objectInStorage = JSON.parse(valueInStorage);
                setCode(objectInStorage.code);
                setUrl(objectInStorage.url);
                const systemChat: Data = {
                    sender: systemName,
                    message: localStorage.getItem("systemPrompt") || "",
                };
                dispatch(addChatHistory({
                    chatMessage: systemChat,
                }));
                const webPageChat: Data = {
                    sender: userName,
                    message: localStorage.getItem("webpagePrompt") || "",
                };
                dispatch(addChatHistory({
                    chatMessage: webPageChat,
                }));
                const workerChat: Data = {
                    sender: workerName,
                    message: objectInStorage.code,
                };
                dispatch(addChatHistory({
                    chatMessage: workerChat,
                }));
            }
        }
    }, [index]);

    useEffect(() => {
        console.log(JSON.stringify(localStorage.getItem(String(index))));
    }, [code, url]);

    return (
        <div>
            {hasStyle && (
                <div style={{ display: "flex" }}>
                    <Toggle
                        onText='Webpage'
                        offText='Code'
                        checked={isWebPage}
                        onChange={handleToggleChange}
                        styles={toggleStyles}
                    />
                </div>
            )}
            {isWebPage && <iframe onLoad={onLoad} ref={webPageRef} src={url} width="100%" height={webPageHeight} />}
            {!isWebPage && (
                <pre className="language-javascript">
                    <code>{code}</code>
                </pre>
            )}
            <Chat onChangeCode={(c) => setCode(c)} onChangeUrl={(u) => setUrl(u)} />
        </div>
    );
}

export default Result;
