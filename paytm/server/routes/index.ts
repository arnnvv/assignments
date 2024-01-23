import express from "express";
import usersRouter from "./userRouter.ts";
const router = express.Router();

router.use("/users", usersRouter);

export default router;
