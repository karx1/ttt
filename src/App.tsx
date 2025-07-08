import { useRef, useState } from "react";
import "./index.css";
import Turn from "./Turn";
import { Square, SquareRef } from "./Square";

export function App() {
    let [turn, setTurn] = useState(Turn.X);
    let [done, setDone] = useState(false);

    let swapTurn = () => {
        if (turn == Turn.X) {
            setTurn(Turn.O);
        } else {
            setTurn(Turn.X);
        }
    };

    let refs = [...Array(9)].map(() => useRef<SquareRef>(null));

    let checkRows = () => {
        let states = refs.map((ref, _i) => ref.current?.getState());
        console.log(states);
    };

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
                            done={done}
                            swapTurn={swapTurn}
                            checkRows={checkRows}
                            ref={refs[i]}
                        />
                    ))}
                </div>
            </div>
            <p>
                <button
                    onClick={() => {
                        for (let ref of refs) {
                            ref.current?.clear();
                        }
                        setDone(false);
                    }}
                >
                    Clear squares
                </button>
            </p>
        </div>
    );
}

export default App;
