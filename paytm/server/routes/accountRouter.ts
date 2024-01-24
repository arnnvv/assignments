import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import authenticate from "../authenticate.ts";
const accountRouter = express.Router();

export default accountRouter;
