-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_wardId_fkey";

-- AlterTable
ALTER TABLE "Personal" ALTER COLUMN "positionId" DROP NOT NULL,
ALTER COLUMN "wardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
