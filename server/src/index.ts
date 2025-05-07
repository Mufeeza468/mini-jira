import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import projectRoute from "./routes/projectRoute";
import taskRoute from "./routes/taskRoute";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("Mini Jira API is running...");
});

app.use('/api/users', userRoute);
app.use('/api/project', projectRoute)
app.use('/api/task', taskRoute)

mongoose.connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
