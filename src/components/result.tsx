// TODO: Render web page in a component
import React, { useState, useEffect } from 'react';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { useAppSelector, useAppStore } from '../lib/hooks';
import { useRouter } from 'next/router';

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

    const handleToggleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        if (checked != undefined) {
            setIsWebPage(checked);
        }
    };

    // This useEffect hook ensures that the styles of the toggle are applied after the
    // component is fully rendered
    useEffect(() => {
        setHasStyle(true);
    }, []);

    // if (index == null) {
    //     return (
    //         <div>
    //             Invalid index.
    //         </div>
    //     );
    // }

    useEffect(() => {
        if (typeof index == "string") {
            const valueInStorage = localStorage.getItem(String(index));
            if (valueInStorage != null && valueInStorage.length > 0) { // Check if value in storage is empty string or undefined
                const objectInStorage = JSON.parse(valueInStorage);
                setCode(objectInStorage.code);
                setUrl(objectInStorage.url);
            }
        }
    }, [index]);

    // const store = useAppStore();

    // useEffect(() => {
    //     console.log("Hello" + index + " " + JSON.stringify(store.getState()));
    // }, [store, index]);

    // if (code == null) {
    //     return (
    //         <div>
    //             Error fetching result.
    //         </div>
    //     );
    // }

    return (
        <div>
            {hasStyle && (
                <Toggle
                    onText='Webpage'
                    offText='Code'
                    checked={isWebPage}
                    onChange={handleToggleChange}
                    styles={toggleStyles}
                />
            )}
            {isWebPage && <iframe src={url} width="70%" height="70%" />}
            {!isWebPage && (
                <pre className="language-javascript">
                    <code>{code}</code>
                </pre>
            )}
        </div>
    );
}

export default Result;
