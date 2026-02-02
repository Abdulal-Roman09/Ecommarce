-- CreateTable
CREATE TABLE "_CategoryToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToVendor_B_index" ON "_CategoryToVendor"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToVendor" ADD CONSTRAINT "_CategoryToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "categorys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToVendor" ADD CONSTRAINT "_CategoryToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
