import Router from "express";
import { getFiles } from "./controllers/getFiles.js";

const router = Router();

//defining route for endpoint, and using the function from getFiles to handle that route
router.get("/api/files", getFiles)


export { router };
