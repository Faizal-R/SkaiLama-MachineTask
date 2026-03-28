import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types.js";
import type { IEventService } from "../services/interfaces/IEventService.js";
import { IEventController } from "./interfaces/IEventController.js";
import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../handlers/tryCatch.js";
import { CreateEventDTO } from "../dto/event/CreateEventDTO.js";
import { createResponse } from "../handlers/response.js";
import { statusCodes } from "../constants/enums/statusCodes.js";
import { UpdateEventDTO } from "../dto/event/UpdateEventDTO.js";
@injectable()
export class EventController implements IEventController {
  constructor(
    @inject(DI_TOKENS.SERVICES.EVENT) private _eventService: IEventService,
  ) {}
  createEvent = tryCatch(async (req: Request, res: Response) => {
    const dto: CreateEventDTO = req.body;

    const createdEvent = await this._eventService.createEvent(dto);
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Event Created Successfully",
      createdEvent,
    );
  });
  updateEventDetails = tryCatch(async (req: Request, res: Response) => {
    const dto: UpdateEventDTO = req.body;

    const updatedEvent = await this._eventService.updateEventDetails(dto);
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Event Updated Successfully",
      updatedEvent,
    );
  });

  getEventsByProfile = tryCatch(async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const events = await this._eventService.getEventsByProfile(
      profileId as string,
    );
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Events Fetched Successfully",
      events,
    );
  });
  getEventDetails = tryCatch(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const event = await this._eventService.getEventDetails(eventId as string);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Event Fetched Successfully",
      event,
    );
  });
}
