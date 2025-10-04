-- AlterTable
ALTER TABLE "User" ADD COLUMN "notifyNewPostByEmail" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "User" ADD COLUMN "notificationEmail" TEXT;
