import express from "express";
import game_engine_router from "./routes/game_engine.js";

const app = express();

const port = 3000;

app.use(express.json());

app.use('/game_engine', game_engine_router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
