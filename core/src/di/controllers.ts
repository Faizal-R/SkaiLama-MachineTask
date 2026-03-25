import container from "./index.js";
import { IProfileController } from "../controllers/interfaces/IProfileController.js";

import { ProfileController } from "../controllers/ProfileController.js";
import { DI_TOKENS } from "./types.js";


container.bind<IProfileController>(DI_TOKENS.CONTROLLERS.PROFILE).to(ProfileController)