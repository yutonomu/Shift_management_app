/*
  Warnings:

  - The `isOverlapShiftId` column on the `shifts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shifts" DROP COLUMN "isOverlapShiftId",
ADD COLUMN     "isOverlapShiftId" TEXT[] DEFAULT ARRAY[]::TEXT[];
