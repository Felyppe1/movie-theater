/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdb_id` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "tmdb_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdb_id_key" ON "movies"("tmdb_id");
