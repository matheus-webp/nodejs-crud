import express from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();

export default router;

router.get("/", UserController.index);
