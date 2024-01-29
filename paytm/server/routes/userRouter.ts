import express, { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Users, { Accounts } from "../db.ts";
import JWT_SECRET from "../config.ts";
import authenticate from "../authenticate.ts";
const userRouter = express.Router();

interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  _id?: string;
}

const validate = (user: User) => {
  const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
  });
  return signupSchema.safeParse(user);
};

const validateLogin = (user: User) => {
  const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
  });
  return signinSchema.safeParse(user);
};

const validateUpdate = (user: User) => {
  const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(3).optional(),
    lastName: zod.string().min(3).optional(),
  });
  return updateSchema.safeParse(user);
};

userRouter
  .route("/")
  .get(async (res: Response) => {
    res.send("Hello from /users");
  })
  .put(authenticate, async (req: Request, res: Response) => {
    const { update } = req.body;
    if (validateUpdate(update).success) {
      try {
        await Users.findOneAndUpdate({ _id: req.userId }, update, {
          new: true,
        });
        return res.status(200).json({
          message: "User Updated",
        });
      } catch (error) {
        console.error(`Error in updating user: ${error}`);
        return res.status(500).json({
          message: `Error in updating user: ${error}`,
        });
      }
    } else return res.status(401).json(`Invalid Credentials`);
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
    await Accounts.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });
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

  if (!validateLogin(user).success)
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

userRouter
  .use(authenticate)
  .route("/bulk")
  .get(async (req: Request, res: Response) => {
    const { target } = req.query || "";
    try {
      const users = await Users.find({
        $or: [
          {
            firstName: {
              regex: target,
            },
            lastName: {
              regex: target,
            },
          },
        ],
      });
      return res.status(200).json({
        user: users?.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
    } catch (error) {
      console.error(`Error in finding user: ${error}`);
      return res.status(500).json({
        message: `Error in finding user: ${error}`,
      });
    }
  });

export default userRouter;
