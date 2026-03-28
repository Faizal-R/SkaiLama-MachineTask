import container from "./index.js";

import { IProfileService } from "../services/interfaces/IProfileService.js";
import { IEventService } from "../services/interfaces/IEventService.js";
import { IEventLogService } from "../services/interfaces/IEventLogService.js";

import { ProfileService } from "../services/ProfileService.js";
import { EventService } from "../services/EventService.js";
import { EventLogService } from "../services/EventLogService.js";
import { DI_TOKENS } from "./types.js";

container.bind<IProfileService>(DI_TOKENS.SERVICES.PROFILE).to(ProfileService);
container.bind<IEventService>(DI_TOKENS.SERVICES.EVENT).to(EventService);
container
  .bind<IEventLogService>(DI_TOKENS.SERVICES.EVENT_LOG)
  .to(EventLogService);
