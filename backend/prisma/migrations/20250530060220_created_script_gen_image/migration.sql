/*
  Warnings:

  - You are about to drop the `GenAI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GenAI";

-- CreateTable
CREATE TABLE "Script" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "prompt" VARCHAR(1000) NOT NULL,
    "dateLastModified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(15000) NOT NULL,
    "platform" VARCHAR(60) NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenImage" (
    "image_id" SERIAL NOT NULL,
    "thumbnailImage" TEXT,
    "scriptId" TEXT NOT NULL,

    CONSTRAINT "GenImage_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Script_id_key" ON "Script"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GenImage_image_id_key" ON "GenImage"("image_id");

-- AddForeignKey
ALTER TABLE "GenImage" ADD CONSTRAINT "GenImage_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
