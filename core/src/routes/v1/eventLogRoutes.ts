import { Router } from "express";
import { resolve } from "../../di/index.js";
import { DI_TOKENS } from "../../di/types.js";
import { IEventLogController } from "../../controllers/interfaces/IEventLogController.js";

const router = Router();
const eventLogController = resolve<IEventLogController>(
  DI_TOKENS.CONTROLLERS.EVENT_lOG,
);
router.get("/:eventId", eventLogController.getAllLogsByEvent);

export default router;
