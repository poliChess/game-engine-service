import { Router } from "express";
import chessEngine from "js-chess-engine";
import isValidFen from "../../fen_validator.js";

import { statusGood, statusBad } from "../../utils.js";

const router = Router();

let defaultEngineLevel = 2;

router.route('/level').get((_, res) => {
    res.send({ engineLevel: defaultEngineLevel });
});

router.route('/move/validate').post((req, res) => {
    // JSON request format: { fen: String!, move: String! };
    const { fen, move } = req.body;

    if (!fen || !move)
        return res.send(statusBad('bad request'));

    if (!isValidFen(fen))
        return res.send(statusBad('invalid fen'));

    try {
        const newFen = chessEngine.move(fen, move.substr(0, 2), move.substr(2, 2));
        res.send({ move, newFen, ...statusGood });
    } catch (err) {
        res.send(statusBad('invalid move: ' + err.message));
    }
});

router.route('/move/suggest').post((req, res) => {
    // JSON request format: { fen: String!, engineLevel: Int };
    const fen = req.body.fen;
    if (!fen)
        return res.send(statusBad('bad request'));

    const engineLevel = req.body.engineLevel || defaultEngineLevel;
    if (engineLevel < 0 || 3 < engineLevel)
        return res.send(statusBad('bad engine level - can be {0, 1, 2, 3}'));

    if (!isValidFen(fen))
        return res.send(statusBad('invalid fen'));

    try {
        const aiMove = chessEngine.aiMove(fen, engineLevel);
        const from = Object.keys(aiMove)[0];
        const to = Object.values(aiMove)[0];

        const newFen = chessEngine.move(fen, from, to);

        res.send({ move: from + to, newFen, ...statusGood });
    } catch (err) {
        res.send(statusBad('engine error: ' + err.message));
    }
});

export default router;

// NOTE: (fen viewer) https://www.dailychess.com/chess/chess-fen-viewer.php
