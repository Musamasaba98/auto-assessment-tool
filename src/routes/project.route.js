import express from "express";
import { assessProject } from "../controllers/project.controller.js";

const router = express.Router();

router.route("/").post(assessProject);

export default router;
