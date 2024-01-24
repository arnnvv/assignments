import express, { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Users from "../db";
import JWT_SECRET from "../config.ts";
const userRouter = express.Router();

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  _id?: string;
}

const validate = (user: User) => {
  const signupSchema = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
  });
  return signupSchema.safeParse(user);
};

userRouter.get("/", async (req: Request, res: Response) => {
  res.send("Hello from /users");
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!validate(user).success)
    return res.status(401).json(`Invalid Credentials`);

  try {
    const existingUser = await Users.findOne({
      useranme: user.username,
    });

    if (existingUser) return res.status(400).json("Username already exists");

    const hashedPassword = await argon2.hash(user.password);

    const createdUser = await Users.create({
      ...user,
      password: hashedPassword,
    });
    const userId = createdUser._id;
    const token: string | undefined = jwt.sign(userId, JWT_SECRET);
    return res.status(200).json({
      message: "User Created",
      token: token,
    });
  } catch (error) {
    console.error(`Error in creating user: ${error}`);
    return res.status(500).json({
      message: `Error in creating user: ${error}`,
    });
  }
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { user } = req.body;

  if (!validate(user).success)
    return res.status(401).json(`Invalid Credentials`);

  try {
    const existingUser: User | null = await Users.findOne({
      username: user.username,
    });

    if (!existingUser) return res.status(401).json(`Username dosen't exist`);

    const passwordMatch = await argon2.verify(
      existingUser.password,
      user.password,
    );
    if (!passwordMatch) return res.status(401).json(`Wrong Password`);

    const token: string | undefined = jwt.sign(existingUser._id, JWT_SECRET);
    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    console.error(`Error in Logging in: ${error}`);
    return res.status(500).json({
      message: `Error in Logging in`,
    });
  }
});

export default userRouter;
