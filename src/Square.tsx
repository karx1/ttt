import { Ref, useImperativeHandle, useState } from "react";
import { Turn } from "./Turn";

export enum SquareState {
    None = "",
    X = Turn.X,
    O = Turn.O,
}

function squareStateFromTurn(t: Turn): SquareState {
    if (t == Turn.X) {
        return SquareState.X;
    } else {
        return SquareState.O;
    }
}

interface SquareProps {
    currentTurn: Turn;
    swapTurn: () => void;
    ref: Ref<SquareRef>;
}

export interface SquareRef {
    clear: () => void;
}

export function Square({ currentTurn, swapTurn, ref }: SquareProps) {
    let [state, setState] = useState(SquareState.None);

    useImperativeHandle(
        ref,
        () => ({
            clear: () => setState(SquareState.None),
        }),
        [state]
    );

    return (
        <div
            className="square"
            onClick={() => {
                if (state == SquareState.None) {
                    setState(squareStateFromTurn(currentTurn));
                    swapTurn();
                }
            }}
        >
            {state}
        </div>
    );
}
