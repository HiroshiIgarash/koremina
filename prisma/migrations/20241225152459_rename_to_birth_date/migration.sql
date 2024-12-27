/*
  Warnings:

  - You are about to drop the column `birthDay` on the `Liver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Liver" DROP COLUMN "birthDay",
ADD COLUMN     "birthDate" INTEGER;
