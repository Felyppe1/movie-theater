-- CreateTable
CREATE TABLE "_RoomToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToTechnology_AB_unique" ON "_RoomToTechnology"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToTechnology_B_index" ON "_RoomToTechnology"("B");

-- AddForeignKey
ALTER TABLE "_RoomToTechnology" ADD CONSTRAINT "_RoomToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToTechnology" ADD CONSTRAINT "_RoomToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
