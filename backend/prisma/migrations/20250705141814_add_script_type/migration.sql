/*
  Warnings:

  - You are about to drop the `gen_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gen_image" DROP CONSTRAINT "gen_image_chatId_fkey";

-- DropForeignKey
ALTER TABLE "gen_image" DROP CONSTRAINT "gen_image_userId_fkey";

-- DropTable
DROP TABLE "gen_image";

-- CreateTable
CREATE TABLE "genImage" (
    "image_id" SERIAL NOT NULL,
    "thumbnailImage" TEXT,
    "chatId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "genImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genImage_image_id_key" ON "genImage"("image_id");

-- AddForeignKey
ALTER TABLE "genImage" ADD CONSTRAINT "genImage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genImage" ADD CONSTRAINT "genImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
