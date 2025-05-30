/*
  Warnings:

  - You are about to drop the `script` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gen_image" DROP CONSTRAINT "gen_image_scriptId_fkey";

-- DropForeignKey
ALTER TABLE "script" DROP CONSTRAINT "script_userId_fkey";

-- DropTable
DROP TABLE "script";

-- CreateTable
CREATE TABLE "GenText" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "prompt" VARCHAR(1000) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(15000) NOT NULL,
    "platform" VARCHAR(60) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GenText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenText_id_key" ON "GenText"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GenText_title_key" ON "GenText"("title");

-- AddForeignKey
ALTER TABLE "GenText" ADD CONSTRAINT "GenText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gen_image" ADD CONSTRAINT "gen_image_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "GenText"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
