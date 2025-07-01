import { useState } from "react";
import "./index.css";
import Turn from "./Turn";
import { Square } from "./Square";

export function App() {
    let [turn, setTurn] = useState(Turn.X);

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <p>
                Current Turn: {turn}
            </p>
            <div className="grid-outer">
                <div className="grid">
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                    <Square currentTurn={turn}></Square>
                </div>
            </div>
            <p>
                <button onClick={() => {
                    if (turn == Turn.X) {
                        setTurn(Turn.O);
                    } else {
                        setTurn(Turn.X);
                    }
                }}>
                    Swap Turn
                </button>
            </p>
        </div>
    );
}

export default App;
