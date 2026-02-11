import { Router } from "express";
import { getLiveData } from "../controllers/liveDataController.js";
const router = Router();

router.get("/live-data", getLiveData);
router.post

export default router;
