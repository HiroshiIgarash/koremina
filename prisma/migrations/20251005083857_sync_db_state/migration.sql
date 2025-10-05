-- AlterTable: Add bio column to User table
ALTER TABLE "public"."User" ADD COLUMN "bio" TEXT;

-- AlterTable: Change _LiverToVideo from unique index to primary key
ALTER TABLE "public"."_LiverToVideo" DROP CONSTRAINT IF EXISTS "_LiverToVideo_AB_unique";
DROP INDEX IF EXISTS "public"."_LiverToVideo_AB_unique";
ALTER TABLE "public"."_LiverToVideo" ADD CONSTRAINT "_LiverToVideo_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _angel from unique index to primary key
ALTER TABLE "public"."_angel" DROP CONSTRAINT IF EXISTS "_angel_AB_unique";
DROP INDEX IF EXISTS "public"."_angel_AB_unique";
ALTER TABLE "public"."_angel" ADD CONSTRAINT "_angel_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _bad from unique index to primary key
ALTER TABLE "public"."_bad" DROP CONSTRAINT IF EXISTS "_bad_AB_unique";
DROP INDEX IF EXISTS "public"."_bad_AB_unique";
ALTER TABLE "public"."_bad" ADD CONSTRAINT "_bad_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _cry from unique index to primary key
ALTER TABLE "public"."_cry" DROP CONSTRAINT IF EXISTS "_cry_AB_unique";
DROP INDEX IF EXISTS "public"."_cry_AB_unique";
ALTER TABLE "public"."_cry" ADD CONSTRAINT "_cry_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _favoriteLivers from unique index to primary key
ALTER TABLE "public"."_favoriteLivers" DROP CONSTRAINT IF EXISTS "_favoriteLivers_AB_unique";
DROP INDEX IF EXISTS "public"."_favoriteLivers_AB_unique";
ALTER TABLE "public"."_favoriteLivers" ADD CONSTRAINT "_favoriteLivers_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _funny from unique index to primary key
ALTER TABLE "public"."_funny" DROP CONSTRAINT IF EXISTS "_funny_AB_unique";
DROP INDEX IF EXISTS "public"."_funny_AB_unique";
ALTER TABLE "public"."_funny" ADD CONSTRAINT "_funny_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _good from unique index to primary key
ALTER TABLE "public"."_good" DROP CONSTRAINT IF EXISTS "_good_AB_unique";
DROP INDEX IF EXISTS "public"."_good_AB_unique";
ALTER TABLE "public"."_good" ADD CONSTRAINT "_good_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _love from unique index to primary key
ALTER TABLE "public"."_love" DROP CONSTRAINT IF EXISTS "_love_AB_unique";
DROP INDEX IF EXISTS "public"."_love_AB_unique";
ALTER TABLE "public"."_love" ADD CONSTRAINT "_love_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable: Change _seenVideos from unique index to primary key
ALTER TABLE "public"."_seenVideos" DROP CONSTRAINT IF EXISTS "_seenVideos_AB_unique";
DROP INDEX IF EXISTS "public"."_seenVideos_AB_unique";
ALTER TABLE "public"."_seenVideos" ADD CONSTRAINT "_seenVideos_AB_pkey" PRIMARY KEY ("A", "B");
