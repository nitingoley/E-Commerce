import express from "express";
import {
  addToCart,
  getCartProducts,
  RemoveAllCart,
  updateQuantity,
} from "../controller/cart.controller.js";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, RemoveAllCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;
