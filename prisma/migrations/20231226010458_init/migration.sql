/*
  Warnings:

  - You are about to drop the `_CategoryToPlace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToPlace" DROP CONSTRAINT "_CategoryToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPlace" DROP CONSTRAINT "_CategoryToPlace_B_fkey";

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToPlace";

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
