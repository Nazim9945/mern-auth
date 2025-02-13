
import { NextFunction, Request,Response } from "express";

//verification for token
import jwt from "jsonwebtoken";
export const authMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
        try {
           
            const token=req.headers.token || req.body.token;
            if(!token){
                return res.status(404).json({
                    success:false,
                    message:"please login first"
                })
            }
            const payload=jwt.verify(token,process.env.JWT_SECRET || "");
           
            req.body.user=payload;
            next();
            
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                success:false,
                message:"invalid token"
            })
            
        }
}