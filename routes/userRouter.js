import express from "express";
import UserController from "../controllers/UserController.js";
import recoveryTokenAuth from '../middlewares/recoveryTokenAuth.js'
import sessionAuth from "../middlewares/sessionAuth.js";
const router = express.Router();

export default router;

router.get("/", UserController.index);
router.post('/user', UserController.create)
router.delete('/user', sessionAuth ,UserController.delete)
router.patch('/user/:username', sessionAuth ,UserController.update)
router.post('/recoverpassword', UserController.recover)
router.post('/changepassword/:id/:token', recoveryTokenAuth , UserController.change)
router.post('/login', UserController.login)