import container from "./index.js";
import { DI_TOKENS } from "./types.js";

import type { IEventLogChangeRepository } from "../repositories/interfaces/IEventLogChangeRepository.js";
import type { IEventLogRepository } from "../repositories/interfaces/IEventLogRepository.js";
import type { IEventRepository } from "../repositories/interfaces/IEventRepository.js";
import type { IProfileRepository } from "../repositories/interfaces/IProfileRepository.js";

import { EventLogChangeRepository } from "../repositories/EventLogChangeRepository.js";
import { EventLogRepository } from "../repositories/EventLogRepository.js";
import { EventRepository } from "../repositories/EventRepository.js";
import { ProfileRepository } from "../repositories/ProfileRepository.js";

container
  .bind<IProfileRepository>(DI_TOKENS.REPOSITORIES.PROFILE)
  .to(ProfileRepository)
  .inSingletonScope();

container
  .bind<IEventRepository>(DI_TOKENS.REPOSITORIES.EVENT)
  .to(EventRepository)
  .inSingletonScope();

container
  .bind<IEventLogRepository>(DI_TOKENS.REPOSITORIES.EVENT_LOG)
  .to(EventLogRepository)
  .inSingletonScope();

container
  .bind<IEventLogChangeRepository>(DI_TOKENS.REPOSITORIES.EVENT_LOG_CHANGE)
  .to(EventLogChangeRepository)
  .inSingletonScope();
