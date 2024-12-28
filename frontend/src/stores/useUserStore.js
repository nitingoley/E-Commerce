import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return set({ loading: false });
    }

    try {
      const res = await axios.post("/user/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Signup successful!");
    } catch (error) {
      set({ user: null, loading: false });
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/user/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Login successful!");
    } catch (error) {
      set({ user: null, loading: false });
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },
  logout: async () => {
    try {
      await axios.post("/user/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/user/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
      const errorMessage =
        error.response?.data?.message ||
        "Failed to authenticate. Please log in.";
      toast.error(errorMessage);
    }
  },
  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ loading: true });

    try {
      const response = await axios.post("/user/refresh");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// axios interception . for refresh token

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;
        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
