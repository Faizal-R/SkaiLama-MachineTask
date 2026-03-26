import { NextFunction, Request, Response } from "express";

export interface IEventController{
    createEvent(req:Request,res:Response,next:NextFunction):void
}