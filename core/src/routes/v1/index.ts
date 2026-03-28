import { Router } from "express";
import profileRoutes from './profileRoutes.js'
import eventRoutes from './eventRoutes.js';
import eventLogRoutes from './eventLogRoutes.js'

const router= Router();

router.use("/profile",profileRoutes)
router.use("/events",eventRoutes)
router.use("/events/logs",eventLogRoutes)



export default router