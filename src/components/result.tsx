// TODO: Render web page in a component
import React, { useState, useEffect, useRef, forwardRef, Ref } from "react";
import { Toggle, IToggleStyles } from "@fluentui/react/lib/Toggle";

const toggleStyles: IToggleStyles = {
    root: {
        alignItems: "right",
        backgroundColor: "lightgray",
        border: "1px solid gray",
        borderRadius: "4px",
        padding: "8px",
    },
    thumb: {
        backgroundColor: "blue", // Color of the thumb
    },
    pill: {
        backgroundColor: "gray",
    },
    container: {

    },
    text: {

    },
    label: {
        fontWeight: "bold",
    },
};

const Result = forwardRef<HTMLDivElement, { code: string; url: string }>(({ code, url }, ref: Ref<HTMLDivElement>) => {
    const [isWebPage, setIsWebPage] = useState<boolean>(true);
    const [hasStyle, setHasStyle] = useState<boolean>(false);
    const webPageRef = useRef<HTMLIFrameElement | null>(null);
    const [webPageHeight, setWebPageHeight] = useState("300px");

    const handleToggleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        if (checked != undefined) {
            setIsWebPage(checked);
        }
    };

    // Reference: https://stackoverflow.com/questions/67218249/automatically-adjust-height-of-iframe-using-react-hooks
    const onLoad = () => {
        if (webPageRef?.current?.contentDocument) {
            const iframeBody = webPageRef.current.contentDocument.body;
            const iframeHtml = webPageRef.current.contentDocument.documentElement;
            setWebPageHeight(Math.max(
                iframeBody.scrollHeight,
                iframeBody.offsetHeight,
                iframeHtml.scrollHeight,
                iframeHtml.offsetHeight,
                iframeHtml.clientHeight,
            ) + "px");
        }
    };

    // This useEffect hook ensures that the styles of the toggle are applied after the
    // component is fully rendered
    useEffect(() => {
        setHasStyle(true);
    }, []);

    return (
        <div ref={ref} >
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
        </div>
    );
});

export default Result;
