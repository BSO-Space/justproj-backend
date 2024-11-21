// src/index.ts
import express, { Application, Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler"
import  boardRouter  from "./routes/board.routes";
import  columnRouter  from "./routes/column.routes";
import taskRouter from "./routes/task.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/boards', boardRouter);
app.use('/api/columns', columnRouter);
app.use('/api/tasks', taskRouter);

//error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
