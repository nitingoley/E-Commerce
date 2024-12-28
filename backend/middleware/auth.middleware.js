import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Extract accessToken from cookies or Authorization header
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Verify the token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Find user and exclude password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute middleware:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Middleware to restrict access to admin routes
export const adminRoute = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    res.status(403).json({ message: "Access denied! Admin only." });
  } catch (err) {
    console.error("Error in adminRoute middleware:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
