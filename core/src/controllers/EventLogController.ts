import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types.js";
import type { IEventLogService } from "../services/interfaces/IEventLogService.js";
import { IEventLogController } from "./interfaces/IEventLogController.js";
import { Request, Response } from "express";
import { tryCatch } from "../handlers/tryCatch.js";
import { createResponse } from "../handlers/response.js";
import { statusCodes } from "../constants/enums/statusCodes.js";

@injectable()
export class EventLogController implements IEventLogController {
  constructor(
    @inject(DI_TOKENS.SERVICES.EVENT_LOG)
    private _eventLogService: IEventLogService,
  ) {}

  getAllLogsByEvent = tryCatch(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const logs = await this._eventLogService.getAllLogsByEvent(eventId as string);
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Logs Fetched by Event Successfully",
      logs,
    );
  });
}
