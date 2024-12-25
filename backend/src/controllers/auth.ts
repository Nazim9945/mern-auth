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
            success:false,
            message:"All fields are required"
        })
        return;
    }
    const isExist=await User.findOne({email});
    if(isExist){
        res.status(411).json({
            success:false,
            message:"This user has an account"
        })
        return;
    }
    const hashpwd=await bcrypt.hash(password,10);
    const image=`https://api.dicebear.com/5.x/initials/svg?seed="${firstName} ${lastName}"`
    const newuser=await User.create({firstName,lastName,email,password:hashpwd,image});
    const payload={
        id:newuser._id,        
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET || "",{
        expiresIn:'1d'
    });

    res.status(200).json({
        message:"user created !!",
        token,
        newuser
    })
    return;
  } catch (error) {
    console.log(error);
    res.status(404).json({
        success:false,
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
                        sucess:false,
                        message:"All fields are required"
                    }
                )
            }
            const isExist=await User.findOne({email})
            if(!isExist){
                res.status(404).json({
                    success:false,  
                    message:"please register first!"
                })
                return;
            }
          if(await bcrypt.compare(password,isExist.password)){
                const payload = {
                  id: isExist._id,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
                  expiresIn: "1d",
                });

                res.status(200).json({
                  message: "user logged in successfully!!",
                  token,
                  newuser: isExist,
                });
                return;
          }
         else{
             res.status(404).json({
                success:false,
               message: "password is incorrect",
             });
             return;
         }

        } catch (error) {
            console.log(error);
            res.json(404).json({
                success:false,  
                message:"error while sign in"
            })
        }
}


//update user
const updateUser:RequestHandler=async(req:Request,res:Response)=>{
        try {
            let {firstName,lastName,newpassword,oldpassword }=req.body;
            const user=req.body.user;
            
            const isExist=await User.findOne({_id:user.id});
            firstName=firstName || isExist?.firstName;
            lastName=lastName || isExist?.lastName;
            if(newpassword){
                if(!oldpassword){
                    res.status(404).json({
                        success:false,
                        message:"please provide old password"
                    })
                    return;
                }
                console.log(isExist?.password)
                if(!await bcrypt.compare(oldpassword,isExist?.password || "")){   
                    console.log("running")
                    res.status(404).json({
                        success:false,
                        message:"old password is incorrect"
                    })
                    return;
                }
                 let image=`https://api.dicebear.com/5.x/initials/svg?seed="${firstName} ${lastName}"`
                let hashpwd=await bcrypt.hash(newpassword,10);
                const newuser=await User.findByIdAndUpdate(user.id,{firstName,lastName,password:hashpwd,image},{new:true});
                res.status(200).json({
                    message:"user updated successfully!!",
                    newuser
                })
                return;
            }
            let image=`https://api.dicebear.com/5.x/initials/svg?seed="${firstName} ${lastName}"`
            const newuser=await User.findByIdAndUpdate(user.id,{firstName,lastName,image},{new:true});
            res.status(200).json({
                message:"user updated successfully!!",
                newuser
            })
            return;
        } catch (error) {
            console.log(error);
            res.json(404).json({
                success:false,
                message:"error while updating user"
            })
        }   
          
}


//delete user
const deleteUser:RequestHandler=async(req:Request,res:Response)=>{
        try {
            const user=req.body.user;
            const isExist=await User.findOne({_id:user.id});
            if(!isExist){
                res.status(404).json({
                    success:false,
                    message:"please register first!"
                })
                return;
            }
            await User.findByIdAndDelete(user.id);
            res.status(200).json({
                message:"user deleted successfully!!"
            })
            return;
        } catch (error) {
            console.log(error);
             res.json(404).json({
                success:false,
                message:"error while deleting user"
            })
        }
}
export {signin,signup,deleteUser,updateUser};