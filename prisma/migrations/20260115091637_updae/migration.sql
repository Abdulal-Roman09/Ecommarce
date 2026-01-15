/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "thumbnail",
ADD COLUMN     "image" TEXT;
