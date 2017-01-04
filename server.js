import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";

import schema from "./schema"

const PORT = 3000;

const app = express();

app.use("/", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`server listening at http://${host}:${port}`);
});
