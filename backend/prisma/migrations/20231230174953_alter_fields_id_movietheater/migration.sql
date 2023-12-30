/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_movie_theater_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_number_key" ON "rooms"("number");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
