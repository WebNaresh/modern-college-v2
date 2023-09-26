-- DropForeignKey
ALTER TABLE "FamilyDetail" DROP CONSTRAINT "FamilyDetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "PreviousAcademic" DROP CONSTRAINT "PreviousAcademic_userId_fkey";

-- AddForeignKey
ALTER TABLE "PreviousAcademic" ADD CONSTRAINT "PreviousAcademic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyDetail" ADD CONSTRAINT "FamilyDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
