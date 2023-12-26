/*
  Warnings:

  - A unique constraint covering the columns `[cellphone_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "social_name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_id_key" ON "users"("cellphone_id");
