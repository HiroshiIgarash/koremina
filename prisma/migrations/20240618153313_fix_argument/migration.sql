/*
  Warnings:

  - You are about to drop the column `name_1` on the `Liver` table. All the data in the column will be lost.
  - You are about to drop the column `name_2` on the `Liver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Liver" DROP COLUMN "name_1",
DROP COLUMN "name_2",
ADD COLUMN     "name1" TEXT,
ADD COLUMN     "name2" TEXT;
