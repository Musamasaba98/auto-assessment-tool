import express from "express";
import projectRouter from "./src/routes/project.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/scrap", projectRouter);
export default app;
