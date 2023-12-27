/*
  Warnings:

  - Changed the type of `sex` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex",
ADD COLUMN     "sex" "SEX" NOT NULL;
