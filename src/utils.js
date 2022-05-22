const statusGood = { success: true, message: "ok" }
const statusBad = msg => ({ success: false, message: msg })
const GameStatusEnum = {
    DRAW: "draw",
    WINNER_WHITE: "winner w",
    WINNER_BLACK: "winner b"
};

export { statusGood, statusBad, GameStatusEnum };
