/*
  Warnings:

  - The `platform` column on the `chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `typeOfChat` column on the `chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "platform",
ADD COLUMN     "platform" VARCHAR(60)[],
DROP COLUMN "typeOfChat",
ADD COLUMN     "typeOfChat" VARCHAR(60)[];
