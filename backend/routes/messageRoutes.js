import express from "express";
import { getMessages, sendMessage } from "../controller/messageController";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);

export default router;