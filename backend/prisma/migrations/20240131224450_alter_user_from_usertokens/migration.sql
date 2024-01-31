-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cellphone_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cellphone_id_fkey" FOREIGN KEY ("cellphone_id") REFERENCES "cellphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
