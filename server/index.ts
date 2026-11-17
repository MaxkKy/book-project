import { prisma } from "@/lib/prisma";
import express, { NextFunction, Request, Response } from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { Prisma, Role } from "@/generated/prisma/client";
import { upload } from "@/middleware/UploadImage/upload";
import { AppError } from "@/lib/error/AppError";
import handleError from "@/middleware/HandleError/handleError";
import { handleAuth } from "@/middleware/HandleAuth/handleAuth";
const app = express();
const cors = require("cors");
require("dotenv").config();
const secret = process.env.JWT_SECRET!;
const port = process.env.PORT;
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieparser());
// app.use("/upload", express.static(path.join(process.cwd(), "upload")));
app.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, lastname, password, gmail } = req.body;
      const hashPassword = await argon2.hash(password);
      await prisma.user.create({
        data: {
          username,
          lastname,
          gmail,
          password: hashPassword,
          role: "User",
        },
      });
      return res.status(201).json({ message: "Register Success" });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(400).json({
            message: "Name DB is Unique",
            code: "DUPLICATE_NAME",
            statusCode: 400,
          });
        }
      }
      next(err);
    }
  },
);
app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gmail, password } = req.body;
    const user = await prisma.user.findUnique({ where: { gmail: gmail } });
    if (!user) {
      return res.status(400).json({
        message: "Error Fail wrong Email or Password",
        code: "INVALID_CREDENTIALS",
        statusCode: 400,
      });
    }
    const checkPassword = await argon2.verify(user.password, password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Error Fail wrong Email or Password",
        code: "INVALID_CREDENTIALS",
        statusCode: 400,
      });
    }
    const token = jwt.sign(
      { id: user.id, gmail: user.gmail, role: user.role },
      secret,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("token", token, {
      maxAge: 3600000,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(201).json({ message: "Login Success" });
  } catch (err) {
    next(err);
  }
});
app.get(
  "/users",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const sort = req.query.sort === "desc" ? "desc" : "asc";
      const role = req.query.role as Role;
      let whereCondition;
      if (role) {
        whereCondition = {
          role,
          OR: [
            { username: { contains: search } },
            { lastname: { contains: search } },
          ],
        };
      } else {
        whereCondition = {
          OR: [
            { username: { contains: search } },
            { lastname: { contains: search } },
          ],
        };
      }
      const user = await prisma.user.findMany({
        where: whereCondition,
        orderBy: {
          id: sort,
        },
        select: {
          id: true,
          username: true,
          lastname: true,
          gmail: true,
          role: true,
        },
      });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  },
);
app.get(
  "/user",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: { username: true },
      });
      return res.json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.put(
  "/user/:id",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, lastname, gmail, role } = req.body;
      const { id } = req.params;
      const ManageUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { username, lastname, gmail, role },
      });
      return res.json({ message: "Update Success", ManageUser });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.get(
  "/book",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await prisma.book.findMany({
        select: {
          id: true,
          image: true,
          name: true,
          price: true,
          status: true,
          category: { select: { name: true } },
          stock: true,
        },
      });
      return res.json(book);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.get(
  "/category",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await prisma.category.findMany({
        select: { id: true, name: true },
      });
      return res.json(category);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.post(
  "/category",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({ data: { name } });
      console.log(category);
      return res.status(201).json({ message: "Post Success", category });
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return res.status(400).json({
            message: "Name DB is Unique",
            code: "DUPLICATE_NAME",
            statusCode: 400,
          });
        }
      }
      next(err);
    }
  },
);
app.delete(
  "/category/:id",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.delete({
        where: { id: Number(id) },
      });
      return res.json({ message: "Delete Success", category });
    } catch (err) {
      next(err);
    }
  },
);
// app.post("/book", upload.single('image') ,async (req: Request, res: Response) => {
app.post(
  "/book",
  handleError,
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, stock, status, typeId } = req.body;
      console.log(req.body);
      if (!name || !price || !typeId) {
        return res.status(400).json({
          message:
            "กรุณากรอกข้อมูล ชื่อหนังสือ, ราคา และประเภทหนังสือ ให้ครบถ้วน",
          statusCode: 400,
        });
      }
      const imagePath = req.file ? req.file.path : null;
      await prisma.book.create({
        data: {
          name,
          price: Number(price) || 0,
          image: imagePath,
          status,
          stock: Number(stock),
          typeId: Number(typeId),
        },
      });
      return res.status(201).json({ message: "Post Success" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.get(
  "/order",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await prisma.order.findMany({
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: { select: { username: true } },
          order: {
            select: {
              quantity: true,
              book: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  image: true,
                  status: true,
                },
              },
            },
          },
        },
      });
      return res.json(order);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.post(
  "/order",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order } = req.body;
      const { id } = req.user!;
      if (!order || order.length === 0) {
        return res.status(400).json({
          message: "เลือกหนังสืออย่างน้อย 1 รายการ",
          code: "NO_ITEMS_SELECTED",
          statusCode: 400,
        });
      }
      const result = await prisma.$transaction(async (tx) => {
        for (const orderItem of order) {
          const bookId = Number(orderItem.bookId ?? orderItem.id);
          const quantity = Number(orderItem.quantity);
          if (!bookId) {
            throw new AppError("ไม่พอหนังสือ", "NOT_FOUND", 404);
          }
          const book = await tx.book.findUnique({ where: { id: bookId } });
          if (!book) throw new AppError("Book not Found", "NOT_FOUND", 404);
          if (book.stock < quantity)
            throw new AppError(
              `จำนวนใน Stock ไม่พอ คงเหลือ ${book.stock}`,
              "OUT_OF_STOCK",
              400,
            );
          await tx.book.update({
            where: { id: bookId },
            data: {
              stock: { decrement: Number(orderItem.quantity) },
            },
          });
        }
        const orderItem = [];
        for (const o of order) {
          orderItem.push({
            bookId: Number(o.bookId),
            quantity: Number(o.quantity),
          });
        }
        return await tx.order.create({
          data: {
            order: { create: orderItem },
            userId: id,
            status: "Inprogress",
          },
        });
      });
      return res.status(201).json({ message: "Post Success", result });
    } catch (err: unknown) {
      console.log(err);
      next(err);
    }
  },
);
app.patch(
  "/order/:id",
  handleAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updateStatus = await prisma.order.update({
        where: { id: Number(id) },
        data: { status },
      });
      return res.json({ message: "Update Success", updateStatus });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
app.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    return res.json({ message: "LogOut Success" });
  } catch (err) {
    next(err);
  }
});
app.use(handleError);
app.listen(port, () => {
  console.log("http server is running at " + port);
});
