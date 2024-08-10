/*
  Warnings:

  - You are about to drop the `Dobocreate` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Devices" AS ENUM ('WHITE_PC', 'BLACK_PC', 'LAPTOP', 'MAC1', 'MAC2');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropTable
DROP TABLE "Dobocreate";

-- CreateTable
CREATE TABLE "dobocreate_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "defaultDevice" "Devices",

    CONSTRAINT "dobocreate_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "project" TEXT,
    "selectedDevice" "Devices" NOT NULL,
    "isOverlapShiftId" TEXT,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dobocreate_users_email_key" ON "dobocreate_users"("email");

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "dobocreate_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
