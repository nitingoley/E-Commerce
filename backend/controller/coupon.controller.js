import coupon from "../model/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const Coupon = await coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.json(Coupon || null);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const Coupons = await coupon.findOne({ code: code, userId: req.user });

    if (!Coupons) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    if (Coupons.expirationDate > new Date()) {
      Coupons.isActive = false;
      await Coupons.save();
      return res.status(400).json({ message: "Coupon is expire" });
    }

    res.json({
      message: "Coupon is valid",
      code: Coupons.code,
      discountPercentage: Coupons.discountPercentage,
    });
  } catch (error) {
    console.log("Error in validateCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
