import { AppError } from "@/lib/error/AppError";
import { NextFunction, Request, Response } from "express";

export default function handleError(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (AppError.isAppError(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
      status: err.status,
    });
  }
  return res.status(500).json({
    message: "Server not Found",
    code: "SERVER_ERROR",
    statusCode: 500,
  });
}
