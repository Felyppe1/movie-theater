/*
  Warnings:

  - You are about to drop the column `movieTheater_id` on the `Room` table. All the data in the column will be lost.
  - Added the required column `movie_theater_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_movieTheater_id_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "movieTheater_id",
ADD COLUMN     "movie_theater_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
