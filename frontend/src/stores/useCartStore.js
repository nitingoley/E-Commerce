import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupon");
      set({ coupon: response.data });
    } catch (error) {
      console.log("Error fetching coupons", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupon/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon apply successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon remove successfully");
  },
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
    }
  },
  addCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Added to cart");

      set((prevState) => {
        const existinItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existinItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  removeFromCart: async (productId) => {
    await axios.get(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
    get().calculateTotals();
  },

  // updateQuanity: async (productId, quantity) => {
  //   if (quantity === 0) {
  //     get().removeFromCart(productId);
  //     return;
  //   }
  //   await axios.put(`/cart/${productId}`, { quantity });

  //   set((prevState) => ({
  //     cart: prevState.cart.map((item) =>
  //       item._id === productId ? { ...item, quantity } : item
  //     ),
  //   }));
  //   get().calculateTotals();
  // },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
}));
