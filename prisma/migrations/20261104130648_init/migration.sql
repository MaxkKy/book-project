/*
  Warnings:

  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
