
import { NextFunction, Request,Response } from "express";

//verification for token

export default async function(req:Request,res:Response,next:NextFunction){
        try {
            console.log("token verifiaction")
            
        } catch (error) {
            console.log(error);
            
        }
}