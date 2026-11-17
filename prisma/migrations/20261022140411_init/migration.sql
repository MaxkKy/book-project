-- CreateEnum
CREATE TYPE "statusBook" AS ENUM ('FREE', 'BUY');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,
    "status" "statusBook" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
