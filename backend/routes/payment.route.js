import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkoutSession,
  createCheckoutSession,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-session", protectRoute, checkoutSession);

export default router;
