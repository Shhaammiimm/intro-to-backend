import express from "express";

const app = express();

app.use(express.json());
//routes import
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';


//routes declaration
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;