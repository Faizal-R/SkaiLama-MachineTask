import { NextFunction, Request, Response } from "express";
import { tryCatch } from "../handlers/tryCatch.js";
import { ZodSchema } from "zod";
import { createResponse } from "../handlers/response.js";
import { statusCodes } from "../constants/enums/statusCodes.js";

export const validate = (schema: ZodSchema) =>
  tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { data, success, error } = schema.safeParse(req.body);
    if (!success) {
      return createResponse(
        res,
        statusCodes.BAD_REQUEST,
        false,
        error.issues[0].message,
      );
    }
    req.body = data;
    next();
  });
