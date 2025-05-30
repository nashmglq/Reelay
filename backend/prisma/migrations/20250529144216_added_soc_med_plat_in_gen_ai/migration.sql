/*
  Warnings:

  - Added the required column `socmedPlat` to the `GenAI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GenAI" ADD COLUMN     "socmedPlat" VARCHAR(60) NOT NULL;
