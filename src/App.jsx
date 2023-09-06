import { useEffect, useRef, useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
    const [inputText, changeInputText] = useState("");
    const [selectedText, changeSelectedText] = useState({
        start: "",
        end: "",
        textSelected: "",
    });

    const textfield = useRef(null);

    const addDecoration = (type) => {
        if (!selectedText.textSelected) return;

        const text = textfield.current.value;
        const { start, end, textSelected } = selectedText;

        changeInputText(
            `${text.slice(0, start)}${type}${textSelected}${type}${text.slice(
                end
            )}`
        );
        changeSelectedText({
            start: "",
            end: "",
            textSelected: "",
        });
    };

    useEffect(() => {
        const lol = (event) => {
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const text = textfield.current.value;
            const textSelected = text.slice(start, end);

            changeSelectedText({
                start,
                end,
                textSelected,
            });
            console.log(selectedText);
        };
        document.addEventListener("select", lol);

        return () => {
            console.log("returning");
            document.removeEventListener("select", lol);
        };
    }, []);
    return (
        <>
            <div className="main">
                <h1>Enter the description below</h1>
                <div className="lol">
                    <textarea
                        autoFocus
                        id="md-text"
                        cols="30"
                        rows="10"
                        onChange={(e) => changeInputText(e.target.value)}
                        value={inputText}
                        ref={textfield}
                    ></textarea>
                    <ReactMarkdown children={inputText} className="markdown" />
                </div>
                <br />
                <button onClick={() => addDecoration("**")}>bold</button>
                <br />
                <br />
                <button onClick={() => addDecoration("*")}>Italic</button>
            </div>
        </>
    );
}

export default App;
