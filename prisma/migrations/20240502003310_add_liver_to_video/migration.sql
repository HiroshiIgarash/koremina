-- CreateTable
CREATE TABLE "_LiverToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LiverToVideo_AB_unique" ON "_LiverToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_LiverToVideo_B_index" ON "_LiverToVideo"("B");

-- AddForeignKey
ALTER TABLE "_LiverToVideo" ADD CONSTRAINT "_LiverToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Liver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LiverToVideo" ADD CONSTRAINT "_LiverToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
