import express from "express";
import { getCoupon, validateCoupon } from "../controller/coupon.controller.js";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);

export default router;
