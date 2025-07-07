import axiosInstance from "./axiosInstance"; // Import the Axios instance
import { AxiosRequestConfig } from "axios";
import { useAppSelector } from "./reduxHooks";

// Define the useApi custom hook
const useApi = () => {
  const authState = useAppSelector((state) => state.auth);

  const callApi = async (config: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        data: config?.data,
        headers: {
          Authorization: authState?.user?.stsTokenManager?.accessToken,
        },
      });
      return response?.data;
    } catch (error: any) {
      // Catch any type of error
      throw error;
    } finally {
    }
  };

  return { callApi };
};

export default useApi;
