/*
  Warnings:

  - You are about to drop the column `platform` on the `genText` table. All the data in the column will be lost.
  - Added the required column `platform` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "platform" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "genText" DROP COLUMN "platform";
