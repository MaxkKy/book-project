import {CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import cloudinary from "@/utils/cloudinary"
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder: "book", // ชื่อโฟลเดอร์ที่จะถูกสร้างบน Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }as any
})

export const upload = multer({ storage: storage , limits:{fileSize:1024*1024*2} })