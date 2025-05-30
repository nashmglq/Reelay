/*
  Warnings:

  - You are about to drop the `GenImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Script` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GenImage" DROP CONSTRAINT "GenImage_scriptId_fkey";

-- DropTable
DROP TABLE "GenImage";

-- DropTable
DROP TABLE "Script";

-- CreateTable
CREATE TABLE "script" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "prompt" VARCHAR(1000) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(15000) NOT NULL,
    "platform" VARCHAR(60) NOT NULL,

    CONSTRAINT "script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gen_image" (
    "image_id" SERIAL NOT NULL,
    "thumbnailImage" TEXT,
    "scriptId" TEXT NOT NULL,

    CONSTRAINT "gen_image_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "script_id_key" ON "script"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gen_image_image_id_key" ON "gen_image"("image_id");

-- AddForeignKey
ALTER TABLE "gen_image" ADD CONSTRAINT "gen_image_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
