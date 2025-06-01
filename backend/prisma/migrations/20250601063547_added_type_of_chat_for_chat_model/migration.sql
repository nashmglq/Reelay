/*
  Warnings:

  - Added the required column `typeOfChat` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "typeOfChat" VARCHAR(60) NOT NULL;
