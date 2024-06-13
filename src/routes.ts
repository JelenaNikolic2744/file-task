import Router from "express";
import { getFiles } from "./controllers/getFiles.js";

const router = Router();

router.get("/api/files", getFiles)


export { router };
