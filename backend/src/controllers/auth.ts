import { Request, RequestHandler, Response } from "express";



//signup

const signup: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({
      message: "signup"
    });
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