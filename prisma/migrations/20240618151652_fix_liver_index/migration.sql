-- AlterTable
CREATE SEQUENCE liver_index_seq;
ALTER TABLE "Liver" ALTER COLUMN "index" SET DEFAULT nextval('liver_index_seq');
ALTER SEQUENCE liver_index_seq OWNED BY "Liver"."index";
