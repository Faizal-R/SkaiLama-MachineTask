import container from "./index.js";


import { IProfileService } from "../services/interfaces/IProfileService.js";

import { ProfileService } from "../services/ProfileService.js";
import { DI_TOKENS } from "./types.js";


container.bind<IProfileService>(DI_TOKENS.SERVICES.PROFILE).to(ProfileService)


