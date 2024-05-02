/*
  Warnings:

  - You are about to drop the column `angel` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `bad` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `cry` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `funny` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `good` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `love` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "angel",
DROP COLUMN "bad",
DROP COLUMN "cry",
DROP COLUMN "funny",
DROP COLUMN "good",
DROP COLUMN "love";

-- CreateTable
CREATE TABLE "_good" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_bad" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_love" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_funny" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_cry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_angel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_good_AB_unique" ON "_good"("A", "B");

-- CreateIndex
CREATE INDEX "_good_B_index" ON "_good"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bad_AB_unique" ON "_bad"("A", "B");

-- CreateIndex
CREATE INDEX "_bad_B_index" ON "_bad"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_love_AB_unique" ON "_love"("A", "B");

-- CreateIndex
CREATE INDEX "_love_B_index" ON "_love"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_funny_AB_unique" ON "_funny"("A", "B");

-- CreateIndex
CREATE INDEX "_funny_B_index" ON "_funny"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_cry_AB_unique" ON "_cry"("A", "B");

-- CreateIndex
CREATE INDEX "_cry_B_index" ON "_cry"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_angel_AB_unique" ON "_angel"("A", "B");

-- CreateIndex
CREATE INDEX "_angel_B_index" ON "_angel"("B");

-- AddForeignKey
ALTER TABLE "_good" ADD CONSTRAINT "_good_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_good" ADD CONSTRAINT "_good_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bad" ADD CONSTRAINT "_bad_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bad" ADD CONSTRAINT "_bad_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_love" ADD CONSTRAINT "_love_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_love" ADD CONSTRAINT "_love_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_funny" ADD CONSTRAINT "_funny_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_funny" ADD CONSTRAINT "_funny_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cry" ADD CONSTRAINT "_cry_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cry" ADD CONSTRAINT "_cry_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_angel" ADD CONSTRAINT "_angel_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_angel" ADD CONSTRAINT "_angel_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
