-- CreateEnum
CREATE TYPE "AccountVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "visibility" "AccountVisibility" NOT NULL DEFAULT 'PUBLIC';
