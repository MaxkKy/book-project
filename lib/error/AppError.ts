  export interface ApiErrorResponse {
    message: string;
    code: string;
    status: number;
    statusCode?: number;
    details?: Record<string, string[]>;
  }
  export class AppError extends Error {
    public status : number;
    constructor(
      message: string,
      public code: string,
      public statusCode : number = 500,
      public details?: Record<string, string[]>,
    ) {
      super(message);
      this.name = "AppError";
      this.status = statusCode;
    }

    static isAppError(error: unknown): error is AppError {
      return error instanceof AppError;
    }

    static fromResponse(response: ApiErrorResponse , status?:number): AppError {
      return new AppError(
        response.message,
        response.code,
        response.statusCode ?? status,
        response.details,
      );
    }
  }
