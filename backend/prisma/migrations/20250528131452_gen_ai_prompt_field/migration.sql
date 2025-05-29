/*
  Warnings:

  - Added the required column `prompt` to the `GenAI` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GenAI" ADD COLUMN     "prompt" VARCHAR(1000) NOT NULL;
