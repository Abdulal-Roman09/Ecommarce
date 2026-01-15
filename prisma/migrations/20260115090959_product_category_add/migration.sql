/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropTable
DROP TABLE "public"."Category";

-- CreateTable
CREATE TABLE "categorys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icons" TEXT NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produc_categorys" (
    "categoryId" TEXT NOT NULL,
    "procductId" TEXT NOT NULL,

    CONSTRAINT "produc_categorys_pkey" PRIMARY KEY ("procductId","categoryId")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produc_categorys" ADD CONSTRAINT "produc_categorys_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produc_categorys" ADD CONSTRAINT "produc_categorys_procductId_fkey" FOREIGN KEY ("procductId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
