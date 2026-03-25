import { Router } from "express";
import { resolve } from "../../di/index.js";
import { DI_TOKENS } from "../../di/types.js";
import { IProfileController } from "../../controllers/interfaces/IProfileController.js";


const router= Router();

const profileController=resolve<IProfileController>(DI_TOKENS.CONTROLLERS.PROFILE)

router.post('/',profileController.createProfile)
router.get('/',profileController.getAllProfiles)

export default router