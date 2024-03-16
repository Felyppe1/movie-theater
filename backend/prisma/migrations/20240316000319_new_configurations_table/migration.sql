-- CreateTable
CREATE TABLE "configurations" (
    "id" SERIAL NOT NULL,
    "admin_accessible" BOOLEAN NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);
