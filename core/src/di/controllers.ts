import container from "./index.js";
import { IProfileController } from "../controllers/interfaces/IProfileController.js";
import { IEventController } from "../controllers/interfaces/IEventController.js";
import { IEventLogController } from "../controllers/interfaces/IEventLogController.js";

import { ProfileController } from "../controllers/ProfileController.js";
import { EventController } from "../controllers/EventController.js";
import { EventLogController } from "../controllers/EventLogController.js";
import { DI_TOKENS } from "./types.js";


container.bind<IProfileController>(DI_TOKENS.CONTROLLERS.PROFILE).to(ProfileController)
container.bind<IEventController>(DI_TOKENS.CONTROLLERS.EVENT).to(EventController)
container.bind<IEventLogController>(DI_TOKENS.CONTROLLERS.EVENT_lOG).to(EventLogController)