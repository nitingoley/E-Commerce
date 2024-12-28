import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } =
    useCartStore();
  
  
  
  const handleApplyCoupon = () => {
    if(!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async()=>{
    removeCoupon();
    setUserInputCode("");
  }

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);
  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <label
          htmlFor="voucher"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Do you have a Voucher Code or gift card
        </label>

        <input
          type="text"
          id="voucher"
          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white 
         placeholder-gray-400 focus:ring-emerald-500
        "
          value={userInputCode}
          onChange={(e) => setUserInputCode(e.target.value)}
          placeholder="enter code here"
          required
        />
      </div>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex w-full text-sm items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5  font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        onClick={handleApplyCoupon}
      >
        Apply Code
      </motion.button>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>

          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - (coupon.discountPercentage) % off
          </p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}
      {coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">Your Available Coupon:</h3>
          <p className="mt-2 text-sm text-gray-400">{coupon.code} - {coupon.discountPercentage}% off</p>
        </div>
      )}
         
    </motion.div>
  );
};

export default GiftCouponCard;
