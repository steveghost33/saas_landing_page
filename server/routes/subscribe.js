import { Router } from "express";
import { subscribe, getSubscribers, markContacted, processEmailSequence } from "../controllers/subscribeController.js";

const router = Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);
router.put("/subscribers/:id/contacted", markContacted);
router.post("/process-emails", processEmailSequence);

export default router;
