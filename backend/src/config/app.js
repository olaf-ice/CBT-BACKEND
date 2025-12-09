import express from "express";
import userRouter from "../routes/user.route.js";

const app = express(); // create an express app

// Common middleware
app.use(express.json());

// routes declaration
app.use("/api/v1/users", userRouter);

// example route: http://localhost:4000/api/v1/users/register

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

export default app;