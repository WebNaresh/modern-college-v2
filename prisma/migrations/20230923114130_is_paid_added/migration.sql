/*
  Warnings:

  - You are about to drop the column `caste` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryAddress` on the `PersonalInfo` table. All the data in the column will be lost.
  - Added the required column `employmentStatus` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "caste",
DROP COLUMN "gender",
DROP COLUMN "permanentAddress",
DROP COLUMN "religion",
DROP COLUMN "temporaryAddress",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "employmentStatus" BOOLEAN NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subjectOfTeaching" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "caste" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "permanentAddress" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "religion" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "temporaryAddress" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "WorkHistory" (
    "id" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "subjectTeach" TEXT NOT NULL,
    "serviceYear" INTEGER NOT NULL,
    "personalInfoId" TEXT,

    CONSTRAINT "WorkHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProffesionalAchevement" (
    "id" TEXT NOT NULL,
    "awardName" TEXT NOT NULL,
    "whereYouGot" TEXT NOT NULL,
    "aboutAward" TEXT NOT NULL,
    "personalInfoId" TEXT,

    CONSTRAINT "ProffesionalAchevement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkHistory" ADD CONSTRAINT "WorkHistory_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProffesionalAchevement" ADD CONSTRAINT "ProffesionalAchevement_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
