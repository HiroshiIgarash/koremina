/*
  Warnings:

  - You are about to drop the column `name1` on the `Liver` table. All the data in the column will be lost.
  - You are about to drop the column `name2` on the `Liver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Liver" DROP COLUMN "name1",
DROP COLUMN "name2",
ADD COLUMN     "aliasFirst" TEXT,
ADD COLUMN     "aliasSecond" TEXT;
