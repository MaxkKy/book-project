/*
  Warnings:

  - You are about to drop the column `type` on the `Book` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
