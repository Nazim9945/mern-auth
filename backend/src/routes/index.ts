import express from "express";
import { deleteUser, signin, signup, updateUser } from "../controllers/auth";
import Auth from "../middlewares/Auth";

const router=express.Router();


router.post('/signup',signup)
router.post('/signin',signin)
router.put('/updateProfile',Auth,updateUser)
router.post('/deleteUser',Auth,deleteUser)

export default router