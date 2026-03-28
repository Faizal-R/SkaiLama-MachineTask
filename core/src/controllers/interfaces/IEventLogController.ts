import { NextFunction, Request, Response } from "express";

export interface IEventLogController{
    getAllLogsByEvent(req:Request,res:Response,next:NextFunction):void
}