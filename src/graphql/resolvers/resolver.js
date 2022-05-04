import chessEngine from "js-chess-engine";
import isValidFen from "../../fen_validator.js";

let engineLevel = 2;

const resolver = {
    engineLevel: () => { return engineLevel },
    
    setEngineLevel: (args) => {
        const newLevel = args.newLevel;

        if (newLevel < 0 || 3 < newLevel) {
            return {
                success: false,
                message: 'Bad engine level - can be {0, 1, 2, 3}'
            };
        }

        engineLevel = args.newLevel;
        return { success: true, message: 'Ok' };
    },

    move: (args) => {
        const { fen, from_square, to_square } = args;

        if (!isValidFen(fen)) {
            return { success: false, message: 'Invalid fen' };
        }
    
        try {
            const newFen = chessEngine.move(fen, from_square, to_square);
            return {
                success: true,
                message: 'Ok',
                move: {
                    fen: newFen,
                    from_square: from_square,
                    to_square: to_square
                }
            };
        } catch(err) {
            return { success: false, message: err.message };
        }
    },

    getMove: (args) => {
        const fen = args.fen;

        if (!isValidFen(fen)) {
            return { success: false, message: 'Invalid fen' };
        }

        try {
            const aiMove = chessEngine.aiMove(fen, engineLevel);
            const from = Object.keys(aiMove)[0];
            const to = Object.values(aiMove)[0];
    
            const newFen = chessEngine.move(fen, from, to);
    
            return {
                success: true,
                message: 'Ok',
                move: { fen: newFen, from_square: from, to_square: to }
            };
        } catch(err) {
            return { success: false, message: err.message };
        }
    }
};

export default resolver;
