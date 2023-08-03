import './App.css'
import { useEffect, useMemo, useState } from "react";
import { ReverseSlowResponse } from "./long-processes/reverse-slow.ts";

function App() {
  const [inputText, setInputText] = useState("");
  const [reversedText, setReversedText] = useState("reverse meh");
  const getData: Worker = useMemo(
    () => new Worker(new URL("./long-processes/reverse-slow-basic.js", import.meta.url)),
    []
  );

  useEffect(() => {
    if (window.Worker) {
      getData.onmessage = (e: MessageEvent<string>) => {
        const response = JSON.parse(e.data) as unknown as ReverseSlowResponse;

        setReversedText(response.reversed);
      };
    }
  }, [getData]);

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={() => getData.postMessage({ text: inputText })}>Reverse</button>
      <p>{reversedText}</p>
    </div>
  )
}

export default App
