import { NextFunction, Request, Response } from "express";

export interface IEventController{
    createEvent(req:Request,res:Response,next:NextFunction):void
    getEventsByProfile(req:Request,res:Response,next:NextFunction):void
    getEventDetails(req:Request,res:Response,next:NextFunction):void
    updateEventDetails(req:Request,res:Response,next:NextFunction):void
}