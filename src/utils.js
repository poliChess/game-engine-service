const statusGood = { success: true, message: "ok" }
const statusBad = msg => ({ success: false, message: msg })
const GameStatusEnum = {
  DRAW: "DRAW",
  WINNER_WHITE: "WINNER_WHITE",
  WINNER_BLACK: "WINNER_BLACK"
};

export { statusGood, statusBad, GameStatusEnum };
