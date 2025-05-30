/*
  Warnings:

  - You are about to drop the column `scriptId` on the `gen_image` table. All the data in the column will be lost.
  - You are about to drop the `gen_text` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `gen_image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gen_image" DROP CONSTRAINT "gen_image_scriptId_fkey";

-- DropForeignKey
ALTER TABLE "gen_text" DROP CONSTRAINT "gen_text_userId_fkey";

-- AlterTable
ALTER TABLE "gen_image" DROP COLUMN "scriptId",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- DropTable
DROP TABLE "gen_text";

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genText" (
    "id" SERIAL NOT NULL,
    "prompt" VARCHAR(1000) NOT NULL,
    "content" VARCHAR(15000) NOT NULL,
    "platform" VARCHAR(60) NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "genText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_title_key" ON "chat"("title");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genText" ADD CONSTRAINT "genText_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gen_image" ADD CONSTRAINT "gen_image_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
