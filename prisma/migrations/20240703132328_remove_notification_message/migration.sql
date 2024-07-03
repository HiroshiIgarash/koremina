/*
  Warnings:

  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type,userId,postId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_postId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "message",
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "postId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_type_userId_postId_key" ON "Notification"("type", "userId", "postId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
