/*
  Warnings:

  - A unique constraint covering the columns `[cellphone_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cellphone_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cellphone_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_id_key" ON "users"("cellphone_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
