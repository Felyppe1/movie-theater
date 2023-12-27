/*
  Warnings:

  - The primary key for the `cellphones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `states` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cellphones_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cellphones_id_seq";

-- AlterTable
ALTER TABLE "cities" DROP CONSTRAINT "cities_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "state_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cities_id_seq";

-- AlterTable
ALTER TABLE "states" DROP CONSTRAINT "states_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "states_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "states_id_seq";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "city_id" SET DATA TYPE TEXT,
ALTER COLUMN "state_id" SET DATA TYPE TEXT,
ALTER COLUMN "cellphone_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
