import express from "express";
import bodyParser from "body-parser";
import { router as insert } from "./api/insert";
import { router as deleteRouter } from "./api/delete";
import { router as select } from "./api/select";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/insert", insert);
app.use("/delete", deleteRouter);
app.use("/search", select);