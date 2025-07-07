import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process?.env?.NEXT_PUBLIC_MY_BLOG_BE_URL,
  // baseURL: "http://localhost:3001",
  // timeout: 5000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export default axiosInstance;
