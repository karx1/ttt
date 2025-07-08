import { Ref, useEffect, useImperativeHandle, useState } from "react";
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
    done: boolean;
    swapTurn: () => void;
    checkRows: () => void;
    ref: Ref<SquareRef>;
}

export interface SquareRef {
    clear: () => void;
    getState: () => SquareState;
}

export function Square({
    currentTurn,
    done,
    swapTurn,
    checkRows,
    ref,
}: SquareProps) {
    let [state, setState] = useState(SquareState.None);

    useImperativeHandle(
        ref,
        () => ({
            clear: () => setState(SquareState.None),
            getState: () => state,
        }),
        [state]
    );

    useEffect(checkRows, [state]);

    return (
        <div
            className="square"
            style={{
                cursor: !done ? "pointer" : "default",
            }}
            onClick={() => {
                if (!done && state == SquareState.None) {
                    setState(squareStateFromTurn(currentTurn));
                    swapTurn();
                }
            }}
        >
            {state}
        </div>
    );
}
