import chessEngine from "js-chess-engine";
import { isValidFen, getMoveResult } from "../../fen_analizer.js";

import { statusGood, statusBad } from '../../utils.js';

let defaultEngineLevel = 2;

const resolver = {
  defaultEngineLevel: () => defaultEngineLevel,

  validateMove: (args) => {
    const { fen, move } = args;

    if (!isValidFen(fen))
      return statusBad('invalid fen string');

    try {
      const newFen = chessEngine.move(fen, move.substr(0, 2), move.substr(2, 2));

      // Check for draw / checkmate
      const result = getMoveResult(newFen);

      return { move, newFen, result, ...statusGood };
    } catch (err) {
      return statusBad('invalid move: ' + err.message);
    }
  },

  suggestMove: (args) => {
    const fen = args.fen;
    const engineLevel = args.engineLevel || defaultEngineLevel;

    if (engineLevel < 0 || 3 < engineLevel)
      return statusBad('bad engine level - can be {1, 2, 3}');

    if (!isValidFen(fen))
      return statusBad('invalid fen');

    try {
      const aiMove = chessEngine.aiMove(fen, engineLevel);
      const from = Object.keys(aiMove)[0];
      const to = Object.values(aiMove)[0];

      const newFen = chessEngine.move(fen, from, to);

      // Check for draw / checkmate
      const result = getMoveResult(newFen);

      return { move: from + to, newFen, result, ...statusGood };
    } catch (err) {
      return statusBad('engine error: ' + err.message);
    }
  }
};

export default resolver;
