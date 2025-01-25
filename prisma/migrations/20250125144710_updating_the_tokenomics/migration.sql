/*
  Warnings:

  - You are about to drop the `employ` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" INTEGER;

-- DropTable
DROP TABLE "employ";
