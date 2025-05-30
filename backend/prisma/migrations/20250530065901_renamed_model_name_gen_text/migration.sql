/*
  Warnings:

  - You are about to drop the `GenText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GenText" DROP CONSTRAINT "GenText_userId_fkey";

-- DropForeignKey
ALTER TABLE "gen_image" DROP CONSTRAINT "gen_image_scriptId_fkey";

-- DropTable
DROP TABLE "GenText";

-- CreateTable
CREATE TABLE "gen_text" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "prompt" VARCHAR(1000) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(15000) NOT NULL,
    "platform" VARCHAR(60) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "gen_text_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gen_text_id_key" ON "gen_text"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gen_text_title_key" ON "gen_text"("title");

-- AddForeignKey
ALTER TABLE "gen_text" ADD CONSTRAINT "gen_text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gen_image" ADD CONSTRAINT "gen_image_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "gen_text"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
