import express, { Request, Response } from "express";
import authenticate from "../authenticate.ts";
import { Accounts } from "../db.ts";
import mongoose, { Mongoose } from "mongoose";
const accountRouter = express.Router();

accountRouter
  .use(authenticate)
  .route("/balance")
  .get(async (req: Request, res: Response) => {
    try {
      const account = await Accounts.findOne({ userId: req.userId });
      if (!account) {
        return res.status(404).json({
          message: "Account not found",
        });
      }
      return res.status(200).json({
        message: `Account balance: ${account.balance}`,
        balance: account.balance,
      });
    } catch (error) {
      console.error(`Error in fetching balance: ${error}`);
      return res
        .status(500)
        .json({ message: `Error in fetching balance: ${error}` });
    }
  })
  .route("/tarnsfer")
  .post(async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    try {
      const account = await Accounts.findOne({ userId: req.userId }).session(
        session,
      );
      if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(404).json({
          message: "Insufficient balance",
        });
      }
      await Accounts.findOneAndUpdate(
        { userId: req.userId },
        { $inc: { balance: -amount } },
      ).session(session);
      await Accounts.findOneAndUpdate(
        { userId: to },
        { $inc: { balance: amount } },
      ).session(session);
      await session.commitTransaction();
      return res.json({
        message: "Transfer successful",
      });
    } catch (error) {
      console.error(`Error in tarnsfer: ${error}`);
      return res.status(500).json({ message: `Error in tarnsfer: ${error}` });
    }
  });

export default accountRouter;
