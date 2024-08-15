-- DropForeignKey
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_userId_fkey";

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "dobocreate_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
