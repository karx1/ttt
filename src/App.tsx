import { useState } from "react";
import "./index.css";

export function App() {
    let [count, setCount] = useState(0);

    return (
        <div className="app">
            <h1>Bun + React</h1>
            <p>
                Click counter: {count}
            </p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default App;
