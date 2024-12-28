import express from "express";
import { getProfile, Login, logout, refreshToken, Signup } from "../controller/auth.controller.js";
const router = express.Router();
import {protectRoute} from "../middleware/auth.middleware.js";

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/profile", protectRoute, getProfile);


export default router;

 