import { buildSchema } from "graphql";
import { readFileSync } from "fs";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schema = buildSchema(readFileSync(__dirname + '/game_engine.schema.gql').toString());

export default schema;
