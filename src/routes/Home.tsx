import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";

export const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    let {push} = useHistory();

    /**
     * Get current URL
     */
    useEffect(() => {
    }, []);


    return (
        <div className="App">
            <header className="App-header">
                <p>Home</p>
                <p>URL:</p>
                <p>
                    {url}
                </p>
                <button>SEND MESSAGE</button>
                <button>Remove logo</button>
                <p>Response from content:</p>
                <p>
                    {responseFromContent}
                </p>
                <button onClick={() => {
                    push('/about')
                }}>About page
                </button>
            </header>
        </div>
    )
}
