/*
  Warnings:

  - Made the column `startTime` on table `shifts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `shifts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shifts" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;
