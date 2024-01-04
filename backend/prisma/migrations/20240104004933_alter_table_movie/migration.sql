/*
  Warnings:

  - You are about to drop the column `poster` on the `movies` table. All the data in the column will be lost.
  - Added the required column `duration` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_date` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "poster",
ADD COLUMN     "duration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "max_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;
