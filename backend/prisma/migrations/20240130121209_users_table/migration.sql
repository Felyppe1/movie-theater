/*
  Warnings:

  - The values [USER] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('NORMAL', 'THEATER_ADMIN', 'MOVIE_CURATOR', 'ADMIN');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "ROLE_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'NORMAL';
COMMIT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'NORMAL';

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
