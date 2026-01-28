/*
  Warnings:

  - You are about to drop the `hlws` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."hlws" DROP CONSTRAINT "hlws_inventoryId_fkey";

-- DropTable
DROP TABLE "public"."hlws";
