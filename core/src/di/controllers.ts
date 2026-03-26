import container from "./index.js";
import { IProfileController } from "../controllers/interfaces/IProfileController.js";
import { IEventController } from "../controllers/interfaces/IEventController.js";

import { ProfileController } from "../controllers/ProfileController.js";
import { EventController } from "../controllers/EventController.js";
import { DI_TOKENS } from "./types.js";


container.bind<IProfileController>(DI_TOKENS.CONTROLLERS.PROFILE).to(ProfileController)
container.bind<IEventController>(DI_TOKENS.CONTROLLERS.EVENT).to(EventController)