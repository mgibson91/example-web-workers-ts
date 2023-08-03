import './App.css'
import { useState } from "react";

/* See https://github.com/Shopify/quilt/tree/main/packages/web-worker */
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';

const createWorker = createWorkerFactory(() => import('./long-processes/reverse-slow.ts'));

function App() {
  const [inputText, setInputText] = useState("");
  const [reversedText, setReversedText] = useState("reverse meh");

  const reverseSlowWorker = useWorker(createWorker);

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={async () => {
        const result = await reverseSlowWorker.reverseSlow({ text: inputText });
        setReversedText(result.reversed);
      }}>Reverse</button>
      <p>Input: {inputText}</p>
      <p>Reversed: {reversedText}</p>
    </div>
  )
}

export default App
