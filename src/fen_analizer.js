import { isValidFenPosition, normalizer } from "fen-reader";
import chessEngine from "js-chess-engine";
import { GameStatusEnum } from "./utils.js";

const isValidFen = (fen) => {
    const fenElements = normalizer(fen);
    const fenPositionResponse = isValidFenPosition({ position: fenElements[0] });
    
    return fenPositionResponse.isValid;
}

const getMoveResult = (fen) => {
    const boardStatus = chessEngine.status(fen);
        
    // Check for draw / checkmate
    if (boardStatus.isFinished) {
        if (boardStatus.checkMate && boardStatus.turn === 'white')
            return GameStatusEnum.WINNER_BLACK;
        else if (boardStatus.checkMate && boardStatus.turn === 'black')
            return GameStatusEnum.WINNER_WHITE;
        else
            return GameStatusEnum.DRAW;
    }

    return null;
}

export { isValidFen, getMoveResult };
