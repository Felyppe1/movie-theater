/*
  Warnings:

  - The primary key for the `cellphones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cellphones` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `cities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `states` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `state_id` on the `cities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cellphone_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `state_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_state_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cellphone_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_city_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_state_id_fkey";

-- AlterTable
ALTER TABLE "cellphones" DROP CONSTRAINT "cellphones_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "cellphones_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cities" DROP CONSTRAINT "cities_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "state_id",
ADD COLUMN     "state_id" INTEGER NOT NULL,
ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "states" DROP CONSTRAINT "states_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "states_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cellphone_id",
ADD COLUMN     "cellphone_id" INTEGER NOT NULL,
DROP COLUMN "city_id",
ADD COLUMN     "city_id" INTEGER NOT NULL,
DROP COLUMN "state_id",
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
