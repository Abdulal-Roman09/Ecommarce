-- CreateTable
CREATE TABLE "hlws" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inventoryId" TEXT,

    CONSTRAINT "hlws_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hlws" ADD CONSTRAINT "hlws_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
