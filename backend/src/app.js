import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : "http://localhost:5173",
    credentials: true,
  }),
);

// body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// static files
app.use(express.static("public"));

// ================= ROUTES =================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);


// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Welcome to the Mini Social App");
});

export default app;
