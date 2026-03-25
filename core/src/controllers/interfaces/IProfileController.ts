import { NextFunction, Request, Response } from "express";

export interface IProfileController{
    createProfile(req:Request,res:Response,next:NextFunction):void
    getAllProfiles(req:Request,res:Response,next:NextFunction):void
}