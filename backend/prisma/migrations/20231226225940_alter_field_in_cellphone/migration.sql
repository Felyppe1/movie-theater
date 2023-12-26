/*
  Warnings:

  - You are about to drop the column `cellphone_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cellphone_id_fkey";

-- DropIndex
DROP INDEX "users_cellphone_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cellphone_id";
