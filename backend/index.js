import express from "express";
import "dotenv/config";
const app = express();
import ConnectDB from "./lib/db.js";
import userRoute from "./routes/auth.route.js";
import ProductRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import CouponRoute from "./routes/coupon.route.js";
import PaymentRoute from "./routes/payment.route.js";
import AnalyticsRoute from "./routes/analytics.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const PORT = 7000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/user", userRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", CouponRoute);
app.use("/api/payments", PaymentRoute);
app.use("/api/analytics", AnalyticsRoute);



// serve any client request for production only to redirect to the html index.html page
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  ConnectDB();
  console.log(`The server running on http://localhost:${PORT}`);
});

console.log();
