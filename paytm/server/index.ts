import express from "express";
import Users from "./db.ts";
import router from "./routes/index.ts";

const app = express();

app.use(express.json());

app.use("/api/v1", router);
