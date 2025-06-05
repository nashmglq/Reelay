/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `genText` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "genText_id_key" ON "genText"("id");
