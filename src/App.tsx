import { useRef, useState } from "react";
import "./index.css";
import Turn from "./Turn";
import { Square, SquareRef } from "./Square";

export function App() {
    let [turn, setTurn] = useState(Turn.X);

    let swapTurn = () => {
        if (turn == Turn.X) {
            setTurn(Turn.O);
        } else {
            setTurn(Turn.X);
        }
    };

    let refs = [...Array(9)].map(() => useRef<SquareRef>(null));

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <p>Current Turn: {turn}</p>
            <div className="grid-outer">
                <div className="grid">
                    {[...Array(9)].map((_e, i) => (
                        <Square
                            key={i}
                            currentTurn={turn}
                            swapTurn={swapTurn}
                            ref={refs[i]}
                        />
                    ))}
                </div>
            </div>
            <p>
                <button
                    onClick={() => {
                        for (let i = 0; i < refs.length; i++) {
                            let ref = refs[i];
                            ref.current?.clear();
                        }
                    }}
                >
                    Clear squares
                </button>
            </p>
        </div>
    );
}

export default App;
