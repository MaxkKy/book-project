import { NextFunction, Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/error/AppError";
const secret = process.env.JWT_SECRET!;
// export interface authExpress extends Request {
//   user?: {
//     id: number;
//     gmail: string;
//   };
// }
export async function handleAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authToken = req.cookies.token;
    if (!authToken) {
      throw new AppError("ยังไม่ได้ Login", "UNAUTHORIZED", 401);
    }
    const authSchema = z.object({ gmail: z.string().email() });
    const checkToken = authSchema.parse(jwt.verify(authToken, secret));
    const user = await prisma.user.findUnique({
      where: { gmail: checkToken.gmail },
    });
    if (!user) {
      throw new AppError("User not Found", "NOT_FOUND", 404);
    }
    req.user = { id: user.id };
    next();
  } catch (err) {
    next(err);
  }
}
