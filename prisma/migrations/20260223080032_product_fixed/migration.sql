/*
  Warnings:

  - Made the column `productId` on table `inventories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."inventories" DROP CONSTRAINT "inventories_productId_fkey";

-- AlterTable
ALTER TABLE "inventories" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
