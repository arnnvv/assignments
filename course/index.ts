import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import mongoose from "mongoose";

const port: number = 3000;
const secretKey: string = "YourSecretKey_Keep_it_SAFE";
const app = express();

mongoose.connect(
  "mongodb+srv://arnav:arnavsharma1A@cluster0.n9borfi.mongodb.net/course_selling_app",
);

const Users = mongoose.model("users", {
  username: String,
  password: String,
  purchasedCourses: [Number],
});

const Admins = mongoose.model("admins", {
  username: String,
  password: String,
});

const Courses = mongoose.model("courses", {
  courseId: Number,
  title: String,
  description: String,
  imageLink: String,
  videoLink: String,
});

function validate(person: any) {
  const schema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
  });
  const res = schema.safeParse(person);
  return res;
}

async function handleSignup(req: Request, res: Response, collection: any) {
  const { user } = req.body;
  const valid = validate(user);
  console.log(valid);
  if (!valid.success) {
    res.status(401).json("Invalid Credentials");
    return;
  }
  const existingUser = await collection.findOne({ username: user.username });
  if (existingUser) {
    res.status(400).json("Username already exists");
    return;
  }
  const userCreate = new collection(user);
  await userCreate.save();
  res.status(200).json(`${collection.modelName} Created`);
}

async function handleLogin(req: Request, res: Response, collection: any) {
  const { user } = req.body;
  const valid = validate(user);
  if (valid.success) {
    const existingUser = await collection.findOne({ username: user.username });
    if (!existingUser) {
      res.status(400).json("Username does not exist");
      return;
    }
    if (existingUser.password !== user.password) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }
    const token = jwt.sign({ username: existingUser.username }, secretKey);
    res.status(200).send(token);
  }
}

function aurhenticate(req: Request, res: Response, next: NextFunction) {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json("Invalid Credentials");
  jwt.verify(token, secretKey, (err: any, decoded: string) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.satatus(200).json(`WELCOME`);
});

app.post("/users/signup", async (req: Request, res: Response) => {
  await handleSignup(req, res, Users);
});

app.post("/users/login", async (req: Request, res: Response) => {
  await handleLogin(req, res, Users);
});

app.get("/users/courses", aurhenticate, async (req: Request, res: Response) => {
  try {
    const displayed = await Courses.find();
    res.status(200).json(`Courses: ${displayed}`);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/users/courses/:courseId",
  aurhenticate,
  async (req: Request, res: Response) => {
    try {
      const username = req.user;
      const { courseId } = req.params;
      const user = await Users.findOne({ username });
      const courseCount = await Courses.countDocuments();
      if (courseId > courseCount)
        return res.satatus(404).json("Course does not exit");
      if (user.purchasedCourses.includes(Number(courseId))) {
        return res.status(400).json({ error: "Course already purchased" });
      }
      //Some Operation for transactions thst I don't know
      user.purchasedCourses.push(Number(courseId));
      await user.save();
      res.status(200).json(`Course Purchased Successfully`);
    } catch (err) {
      console.error(`Error in fetching course: ${err}`);
      res.status(500).json({ error: "Error in fetching course" });
    }
  },
);

app.get(
  "/users/purchasedCourses",
  aurhenticate,
  async (req: Request, res: Response) => {
    try {
      const username = req.user;
      const user = await Users.findOne({ username });
      const purchasedCourses = await Courses.find({
        courseId: { $in: user.purchasedCourses },
      });
      res.status(200).json({ purchasedCourses });
    } catch (err) {
      console.error(`Error in fetching purchased courses: ${err}`);
      res.status(500).json({ error: "Error in fetching purchased courses" });
    }
  },
);

app.post("/admins/signup", async (req: Request, res: Response) => {
  await handleSignup(req, res, Admins);
});

app.post("/admins/login", async (req: Request, res: Response) => {
  await handleLogin(req, res, Admins);
});

app
  .route("/admins/courses")
  .all(aurhenticate)
  .get(async (req: Request, res: Response) => {
    try {
      const displayed = await Courses.find();
      res.satatus(200).json(`Courses: ${displayed}`);
    } catch (err) {
      console.error(`Internal Server error: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .post(async (req: Request, res: Response) => {
    const { course } = req.body;
    try {
      const courseCount = await Courses.countDocuments();
      const courseCreate = new Courses({
        ...course,
        courseId: courseCount + 1,
      });
      await courseCreate.save();
      res.status(200).json("Course Created Successfully");
    } catch (error) {
      console.error(`Error in Creating Course: ${error}`);
      res.status(500).json({ error: "Error In Creating Course" });
    }
  });

app.listen(port, () => {
  console.log(`App Listning on port ${port}`);
});
