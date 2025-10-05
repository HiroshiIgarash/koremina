-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationEmailLastSentAt" TIMESTAMP(3),
ADD COLUMN     "notificationEmailSendAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notificationEmailTokenExpires" TIMESTAMP(3),
ADD COLUMN     "notificationEmailTokenHash" TEXT,
ADD COLUMN     "notificationEmailVerified" BOOLEAN NOT NULL DEFAULT false;
