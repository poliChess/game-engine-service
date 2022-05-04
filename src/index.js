import express from "express";
import game_engine_router from "./rest/routes/game_engine.js";

import { graphqlHTTP } from "express-graphql";
import resolver from "./graphql/resolvers/resolver.js";
import schema from "./graphql/schema/schema.js";

const app = express();

const port = 3000;

// REST
app.use(express.json());
app.use('/game_engine', game_engine_router);

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
