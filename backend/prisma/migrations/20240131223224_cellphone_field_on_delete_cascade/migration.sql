-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cellphone_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
