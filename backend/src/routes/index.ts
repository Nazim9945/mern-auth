import express from "express";
import { signin, signup, deleteUser,updateUser } from "../controllers/auth";
import {authMiddleware} from "../middlewares/authMiddleware";

const router=express.Router();


router.post('/signup',signup)
router.post('/signin',signin)
router.put('/updateProfile',authMiddleware,updateUser)
router.post('/deleteUser',authMiddleware,deleteUser)

export default router