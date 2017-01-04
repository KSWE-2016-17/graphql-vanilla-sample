import express from "express";
import bodyParser from "body-parser";
import { graphql } from "graphql";

import schema from "./schema"

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
    graphql(schema, req.body.query)
        .then((result) => {
            res.json(result);
        });
});

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`server listening at http://${host}:${port}`);
});
