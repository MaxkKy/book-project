import { AppError, ApiErrorResponse } from "@/lib/error/AppError";
import axios, { AxiosError } from "axios";
export const apiClinet = axios.create({
  // This client runs in the browser, so Next.js only exposes NEXT_PUBLIC_* vars.
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API,
  withCredentials: true,
});
apiClinet.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Transform to AppError
    if (error.response?.data) {
      return Promise.reject(AppError.fromResponse(error.response.data,error.response.status));
    }   

    // Network error
    if (!error.response) {
      return Promise.reject(new AppError("Network error", "NETWORK_ERROR", 0));
    }

    return Promise.reject(error);
  },
);
