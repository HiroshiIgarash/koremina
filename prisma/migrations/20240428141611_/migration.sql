-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mostFavoriteLiverId" TEXT;

-- CreateTable
CREATE TABLE "Liver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channelHandle" TEXT NOT NULL,

    CONSTRAINT "Liver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_favoriteLivers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteLivers_AB_unique" ON "_favoriteLivers"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteLivers_B_index" ON "_favoriteLivers"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mostFavoriteLiverId_fkey" FOREIGN KEY ("mostFavoriteLiverId") REFERENCES "Liver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteLivers" ADD CONSTRAINT "_favoriteLivers_A_fkey" FOREIGN KEY ("A") REFERENCES "Liver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteLivers" ADD CONSTRAINT "_favoriteLivers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
