import express from "express";
import Users from "./db.ts";
import router from "./routes/index.ts";
import cors from "cors";

const port: number = 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/v1", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
