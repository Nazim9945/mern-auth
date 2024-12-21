import express from "express";
import { signin, signup, deleteUser,updateUser } from "../controllers/auth";
import {authMiddleware} from "../middlewares/authMiddleware";

const router=express.Router();


router.post('/signup',signup)
router.post('/signin',signin)
//@ts-ignore
router.put('/updateProfile',authMiddleware,updateUser)
//@ts-ignore
router.delete('/deleteUser',authMiddleware,deleteUser)

export default router