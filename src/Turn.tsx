export enum Turn {
    X = "❌",
    O = "⭕",
}

export enum Winner {
    None = "",
    Draw = "draw", // debug purposes only - shouldn't be displayed
    X = Turn.X,
    O = Turn.O,
}

export default Turn;
