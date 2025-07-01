import { useState } from "react";
import { Turn } from "./Turn";

export enum SquareState {
    None = "",
    X = Turn.X,
    O = Turn.O,
};

function squareStateFromTurn(t: Turn): SquareState {
    if (t == Turn.X) {
        return SquareState.X;
    } else {
        return SquareState.O;
    }
}

interface SquareProps {
    currentTurn: Turn,
    swapTurn: () => void
}

export function Square(props: SquareProps) {
    let [state, setState] = useState(SquareState.None);

    return (
        // <div className="square" onClick={() => setState(squareStateFromTurn(props.currentTurn))}>
        <div className="square" onClick={() => {
            if (state == SquareState.None) {
                setState(squareStateFromTurn(props.currentTurn));
                props.swapTurn();
            }
        }}>
            {state}
        </div>
    );
}
