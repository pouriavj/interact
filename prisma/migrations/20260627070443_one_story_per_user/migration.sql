/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Story_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Story_userId_key" ON "Story"("userId");
