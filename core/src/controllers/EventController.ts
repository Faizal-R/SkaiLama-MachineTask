import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types.js";
import type { IEventService } from "../services/interfaces/IEventService.js";
import { IEventController } from "./interfaces/IEventController.js";
import { Request, Response } from "express";
import { tryCatch } from "../handlers/tryCatch.js";
import { CreateEventDTO } from "../dto/event/CreateEventDTO.js";
import { createResponse } from "../handlers/response.js";
import { statusCodes } from "../constants/enums/statusCodes.js";
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
     createdEvent
    );
  });
}
