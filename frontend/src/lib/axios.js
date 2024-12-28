// import axios from "axios";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.MODE === "development" ? "http://localhost:7000/api" : "/api",
  withCredentials: true,
});

export default axiosInstance;
