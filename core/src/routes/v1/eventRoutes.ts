import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { eventSchema } from "../../validations/eventSchema.js";
import { resolve } from "../../di/index.js";
import { DI_TOKENS } from "../../di/types.js";
import { IEventController } from "../../controllers/interfaces/IEventController.js";

const router = Router();
const eventController = resolve<IEventController>(DI_TOKENS.CONTROLLERS.EVENT);

router.post("/", validate(eventSchema),eventController.createEvent);

export default router;
