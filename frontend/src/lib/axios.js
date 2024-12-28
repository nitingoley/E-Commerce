import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:7000/api"
      : "https://e-commerce-1-6q5w.onrender.com/api", // Update with your Render URL in production
  withCredentials: true,
});

export default axiosInstance;
