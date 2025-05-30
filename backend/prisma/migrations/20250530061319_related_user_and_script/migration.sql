/*
  Warnings:

  - Added the required column `userId` to the `script` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "script" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "script" ADD CONSTRAINT "script_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
