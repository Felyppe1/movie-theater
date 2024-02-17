/*
  Warnings:

  - You are about to drop the `MovieTheater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieTheater" DROP CONSTRAINT "MovieTheater_city_id_fkey";

-- DropForeignKey
ALTER TABLE "MovieTheater" DROP CONSTRAINT "MovieTheater_state_id_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToMovieTheater" DROP CONSTRAINT "_MovieToMovieTheater_B_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_movie_theater_id_fkey";

-- DropTable
DROP TABLE "MovieTheater";

-- CreateTable
CREATE TABLE "movie_theaters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "state_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "movie_theaters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_theaters_name_key" ON "movie_theaters"("name");

-- AddForeignKey
ALTER TABLE "movie_theaters" ADD CONSTRAINT "movie_theaters_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_theaters" ADD CONSTRAINT "movie_theaters_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "movie_theaters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToMovieTheater" ADD CONSTRAINT "_MovieToMovieTheater_B_fkey" FOREIGN KEY ("B") REFERENCES "movie_theaters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
