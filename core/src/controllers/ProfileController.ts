import { inject } from "inversify";
import { IProfileController } from "./interfaces/IProfileController.js";
import { DI_TOKENS } from "../di/types.js";
import type { IProfileService } from "../services/interfaces/IProfileService.js";
import { Request, Response, NextFunction } from "express";
import { tryCatch } from "../handlers/tryCatch.js";
import { CreateProfileDTO } from "../dto/profile/CreateProfileDTO.js";
import { createResponse } from "../handlers/response.js";
import { statusCodes } from "../constants/statusCodes.js";

export class ProfileController implements IProfileController {
  constructor(
    @inject(DI_TOKENS.SERVICES.PROFILE)
    private _profileService: IProfileService,
  ) {}
  createProfile = tryCatch(async (req: Request, res: Response) => {
    const createProfileDto: CreateProfileDTO = req.body;
    const createdProfile =
      await this._profileService.createProfile(createProfileDto);
    createResponse(
      res,
      statusCodes.CREATED,
      true,
      "Profile Created Successfully",
      {
        profile: createdProfile,
      },
    );
  });

  getAllProfiles = tryCatch(async (req: Request, res: Response) => {
    const profiles = await this._profileService.getAllProfiles();
    createResponse(
      res,
      statusCodes.SUCCESS,
      true,
      "Fetch All Profiles Successfully",
      profiles,
    );
  });
}
