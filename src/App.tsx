import { useState } from "react";
import "./index.css";
import Turn from "./Turn";
import { Square } from "./Square";

export function App() {
    let [turn, setTurn] = useState(Turn.X);

    let swapTurn = () => {
        if (turn == Turn.X) {
            setTurn(Turn.O);
        } else {
            setTurn(Turn.X);
        }
    };

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <p>
                Current Turn: {turn}
            </p>
            <div className="grid-outer">
                <div className="grid">
                    {
                        [...Array(9)].map(() => <Square currentTurn={turn} swapTurn={swapTurn} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
