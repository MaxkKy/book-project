import { toast } from "sonner";
import { AppError } from "@/lib/error/AppError";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
export const useApiError = () => {
  const handleError = (error: unknown) => {
    // Known application error
    // Axios error
    if (AppError.isAppError(error)) {
      const status = error.statusCode ?? error.status;
      const message = ERROR_MESSAGES[error.code] ?? error.message  
      const code = ERROR_MESSAGES[error.code]
      if(status === 400){
        toast.error(message)
        return;
      }
      if (status === 401) {
        toast.error(message);
        return;
      }

      if (status === 403) {
        toast.error(message);
        return;
      }

      if (status === 404) {
        toast.error(message);
        return;
      }

      if (status === 429) {
        toast.error(message);
        return;
      }

      if (code === "NETWORK_ERROR") {
        toast.error(ERROR_MESSAGES.NETWORK_ERROR);
        return;
      }
    } 

   
    if (AppError.isAppError(error)) {
      const message = ERROR_MESSAGES[error.code] ?? error.message;
      toast.error(message);

      // Handle specific error codes
      if (error.code === "UNAUTHORIZED") {
        // Redirect to login
      }

      return;
    }
    // Unknown error
    console.error("Unhandled error:", error);
    toast.error(ERROR_MESSAGES.DEFAULT);
  };

  return { handleError };
};
