import express from "express";
import UserController from "../controllers/UserController.js";
import recoveryAuth from '../middlewares/recoveryAuth.js'
const router = express.Router();

export default router;

router.get("/", UserController.index);
router.post('/user', UserController.create)
router.delete('/user', UserController.delete)
router.patch('/user/:username', UserController.update)
router.post('/recoverpassword', UserController.recover)
router.post('/changepassword/:id/:token', () =>  recoveryAuth , UserController.change)