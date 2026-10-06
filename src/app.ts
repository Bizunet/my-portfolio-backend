import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);

export default app;
