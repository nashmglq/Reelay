/*
  Warnings:

  - Added the required column `userId` to the `genText` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `gen_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "genText" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "gen_image" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "genText" ADD CONSTRAINT "genText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gen_image" ADD CONSTRAINT "gen_image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
