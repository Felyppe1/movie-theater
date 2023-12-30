/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Technology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_movie_theater_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToTechnology" DROP CONSTRAINT "_RoomToTechnology_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToTechnology" DROP CONSTRAINT "_RoomToTechnology_B_fkey";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Seat";

-- DropTable
DROP TABLE "Technology";

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "movie_theater_id" TEXT NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "row" TEXT NOT NULL,
    "column" TEXT NOT NULL,
    "exists" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technologies_name_key" ON "technologies"("name");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_movie_theater_id_fkey" FOREIGN KEY ("movie_theater_id") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToTechnology" ADD CONSTRAINT "_RoomToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToTechnology" ADD CONSTRAINT "_RoomToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
