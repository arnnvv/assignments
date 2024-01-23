import express, { Request, Response } from "express";

const userRouter = express.Router();
userRouter.get("/", async (req: Request, res: Response) => {
res.send("Hello from /users");
}

export default userRouter;
