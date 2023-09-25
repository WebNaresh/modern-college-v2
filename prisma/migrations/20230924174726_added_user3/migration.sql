/*
  Warnings:

  - You are about to drop the column `isAuthorize` on the `PersonalInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "isAuthorize";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAuthorize" "IsAuthorize" NOT NULL DEFAULT 'UnAuthorize';
