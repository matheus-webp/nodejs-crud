import express from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();

export default router;

router.get("/", UserController.index);
router.post('/user', UserController.create)
router.delete('/user', UserController.delete)
