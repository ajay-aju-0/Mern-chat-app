import express from "express";
import { getUsersForSidebar } from "../controller/userController";

const router = express.Router();

router.get("/",getUsersForSidebar)

export default router;