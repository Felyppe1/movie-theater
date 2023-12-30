-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_room_id_fkey";

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
