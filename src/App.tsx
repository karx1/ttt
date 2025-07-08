import { useRef, useState } from "react";
import "./index.css";
import { Turn, Winner } from "./Turn";
import { Square, SquareRef, SquareState } from "./Square";

export function App() {
    let [turn, setTurn] = useState(Turn.X);
    let [done, setDone] = useState(false);
    let [winner, setWinner] = useState(Winner.None);

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

        let get = (row: number, col: number) => {
            let index = 3 * row + col;
            return states[index];
        };

        let winnerFromSquareState = (squareState: SquareState) => {
            if (squareState == SquareState.X) {
                return Winner.X;
            } else if (squareState == SquareState.O) {
                return Winner.O;
            } else {
                // should never happen but otherwise the type will be Winner | undefined so
                return Winner.None;
            }
        };

        // verticals
        for (let col = 0; col < 3; col++) {
            let a = get(0, col);
            let b = get(1, col);
            let c = get(2, col);

            if (a === b && a === c && b === c && a != SquareState.None) {
                setDone(true);
                setWinner(winnerFromSquareState(a!));
                return;
            }
        }

        // horizontals
        for (let row = 0; row < 3; row++) {
            let a = get(row, 0);
            let b = get(row, 1);
            let c = get(row, 2);

            if (a === b && a === c && b === c && a != SquareState.None) {
                setDone(true);
                setWinner(winnerFromSquareState(a!));
                return;
            }
        }

        // southeast diagonal (from top left)
        let a = get(0, 0);
        let b = get(1, 1);
        let c = get(2, 2);

        if (a === b && a === c && b === c && a != SquareState.None) {
            setDone(true);
            setWinner(winnerFromSquareState(a!));
            return;
        }

        // southwest diagonal (from top right)
        a = get(0, 2);
        b = get(1, 1);
        c = get(2, 0);

        if (a === b && a === c && b === c && a != SquareState.None) {
            setDone(true);
            setWinner(winnerFromSquareState(a!));
            return;
        }

        // otherwise, check if all 9 squares are set - if they are, then we have a draw
        for (let i = 0; i < 9; i++) {
            if (states[i] == SquareState.None) {
                setWinner(Winner.None);
                return;
            }
        }

        setWinner(Winner.Draw);
    };

    return (
        <div className="app">
            <h1>Tic Tac Toe</h1>
            <p>Current Turn: {turn}</p>
            {/* bruh this frying me ts ugly asl 😭*/}
            {/* TODO: fix this later */}
            {winner != Winner.None ? (
                winner == Winner.Draw ? (
                    <h2>This game is a draw!</h2>
                ) : (
                    <h2>The winner is {winner}!</h2>
                )
            ) : (
                <></>
            )}
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
