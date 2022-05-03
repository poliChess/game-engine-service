import { Router } from "express";
import chessEngine from "js-chess-engine";
import isValidFen from "../fen_validator.js";

const router = Router();

let engineLevel = 2;

router.route('/get_level').get((req, res) => {
    return res.json(`Engine level=${engineLevel}`);
});

router.route('/set_level').post((req, res) => {
    const newLevel = req.body.level;
    if (!newLevel) {
        return res.status(400).json('Bad request');
    }

    if (newLevel < 0 || 3 < newLevel) {
        return res.status(404).json('Bad engine level - can be {0, 1, 2, 3}');
    }

    engineLevel = newLevel;
    return res.json('Level updated');
});

// NOTE: can make '/move' and '/get_move' two into single route
// (player sends move and gets back board with his and computer's move)
// The display on the frontend might be bad/lagging (while ai chooses move)
router.route('/move').post((req, res) => {
    // JSON request format: { fen, from_square, to_square };
    const { fen, from_square, to_square } = req.body;
    if (!fen || !from_square || !to_square) {
        return res.status(400).json('Bad request');
    }

    if (!isValidFen(fen)) {
        return res.status(400).json("Invalid fen");
    }

    try {
        const newFen = chessEngine.move(fen, from_square, to_square);
        return res.json({ fen: newFen });
    } catch(err) {
        return res.status(404).json(err.message);
    }
});

router.route('/get_move').post((req, res) => {
    // JSON request format: { fen };
    const fen = req.body.fen;
    if (!fen ) {
        return res.status(400).json('Bad request');
    }

    if (!isValidFen(fen)) {
        return res.status(400).json("Invalid fen");
    }

    try {
        const aiMove = chessEngine.aiMove(fen, engineLevel);
        const from = Object.keys(aiMove)[0];
        const to = Object.values(aiMove)[0];

        const newFen = chessEngine.move(fen, from, to);

        return res.json({ fen: newFen, from_square: from, to_square: to });
    } catch(err) {
        return res.status(404).json(err.message);
    }
});

export default router;

// NOTE: (fen viewer) https://www.dailychess.com/chess/chess-fen-viewer.php
