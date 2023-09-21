/*
  Warnings:

  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `mobile2` on the `PersonalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `academicId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FeeCriteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relative` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFee` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Academic" DROP CONSTRAINT "Academic_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "FeeCriteria" DROP CONSTRAINT "FeeCriteria_userId_fkey";

-- DropForeignKey
ALTER TABLE "Relative" DROP CONSTRAINT "Relative_personalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_academicId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "totalFee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" DROP COLUMN "mobile2";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "academicId";

-- DropTable
DROP TABLE "FeeCriteria";

-- DropTable
DROP TABLE "Relative";

-- CreateTable
CREATE TABLE "FamilyDetail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationName" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "FamilyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousAcademic" (
    "id" TEXT NOT NULL,
    "boardUniversity" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "passingYear" TIMESTAMP(3) NOT NULL,
    "percentage" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PreviousAcademic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "totalMark" INTEGER NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FamilyDetail" ADD CONSTRAINT "FamilyDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousAcademic" ADD CONSTRAINT "PreviousAcademic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
