import { Request, RequestHandler, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//signup

const signup: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {firstName,lastName="",email,password}=req.body;
    if(!firstName  || !email || !password){
        res.status(404).json({
            messahe:"All fields are required"
        })
        return;
    }
    const isExist=await User.findOne({email});
    if(isExist){
        res.status(411).json({
            message:"This user has an account"
        })
        return;
    }
    const hashpwd=await bcrypt.hash(password,10);

    const newuser=await User.create({firstName,lastName,email,password:hashpwd});
    const payload={
        id:newuser._id,        
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET || "",{
        expiresIn:'1d'
    });

    res.status(200).json({
        message:"user created !!",
        token
    })
    return;
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error while registering user",
    });
  }
};


//signin
const signin:RequestHandler=async(req:Request,res:Response)=>{
        try {
            const {email,password}=req.body;
            if(!email || !password){
                res.status(404).json(
                    {
                        message:"All fields are required"
                    }
                )
            }
            const isExist=await User.findOne({email})
            if(!isExist){
                res.status(404).json({
                    message:"please register first!"
                })
                return;
            }
          if(await bcrypt.compare(isExist.password,password)){
                const payload = {
                  id: isExist._id,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
                  expiresIn: "1d",
                });

                res.status(200).json({
                  message: "user logged in successfully!!",
                  token,
                });
                return;
          }
          res.status(404).json({
            message:"password is incorrect";
          })
          return;

        } catch (error) {
            console.log(error);
            res.json(404).json({
                message:"error while sign in"
            })
        }
}


//update user
const updateUser:RequestHandler=async(req:Request,res:Response)=>{
        try {
            
        }catch (error) {
            console.log(error);
            res.json(404).json({
                message:"error while updating user"
            })
        }
}


//delete user
const deleteUser:RequestHandler=async(req:Request,res:Response)=>{
        try {
            console.log("delete user")
        } catch (error) {
            console.log(error);
             res.json(404).json({
                message:"error while deleting user"
            })
        }
}
export {signin,signup,deleteUser,updateUser};