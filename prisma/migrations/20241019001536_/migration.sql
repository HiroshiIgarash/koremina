-- CreateTable
CREATE TABLE "_seenVideos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_seenVideos_AB_unique" ON "_seenVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_seenVideos_B_index" ON "_seenVideos"("B");

-- AddForeignKey
ALTER TABLE "_seenVideos" ADD CONSTRAINT "_seenVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_seenVideos" ADD CONSTRAINT "_seenVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
