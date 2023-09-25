-- CreateEnum
CREATE TYPE "IsAuthorize" AS ENUM ('UnAuthorize', 'Request', 'Authorize');

-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "isAuthorize" "IsAuthorize" NOT NULL DEFAULT 'UnAuthorize',
ALTER COLUMN "employmentStatus" SET DEFAULT false;
