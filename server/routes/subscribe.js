import { Router } from "express";
import { subscribe, getSubscribers, markContacted } from "../controllers/subscribeController.js";

const router = Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);
router.put("/subscribers/:id/contacted", markContacted);

export default router;
