/*
  Warnings:

  - Added the required column `state_id` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphone_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "state_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cellphone_id" TEXT NOT NULL,
ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "state_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
