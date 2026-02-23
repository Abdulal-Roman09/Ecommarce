/*
  Warnings:

  - A unique constraint covering the columns `[name,brand,shopId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "products_name_brand_shopId_key" ON "products"("name", "brand", "shopId");
