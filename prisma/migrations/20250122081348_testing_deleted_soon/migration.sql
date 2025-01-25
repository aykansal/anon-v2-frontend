/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "employ" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "position" TEXT,
    "salary" TEXT,
    "department" TEXT,

    CONSTRAINT "employ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
