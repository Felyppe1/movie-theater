/*
  Warnings:

  - Added the required column `quantity_avaiable` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "quantity_avaiable" INTEGER NOT NULL;
