import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProudctStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successful!");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },

  fetchAllProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      console.log("Fetching products for category:", category); // Log category
      const response = await axios.get(`/products/category/${category}`);
      console.log("API Response:", response.data); // Log API response
      set({ products: response.data.products, loading: false });
    } catch (error) {
      console.error("API Error:", error);
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error);
    }
  },
   fetchFeaturedProducts:async ()=>{
    set({loading:true});
    try{
  const response = await axios.get("/products/featured");
   set({products: response.data , loading:false});
    }catch(error){
      set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
    }
   }
}));
