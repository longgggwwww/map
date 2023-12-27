-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "wardId" INTEGER;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
