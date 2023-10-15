-- CreateEnum
CREATE TYPE "Term" AS ENUM ('I', 'II');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('UG', 'PG');

-- CreateEnum
CREATE TYPE "CourseHead" AS ENUM ('TH', 'PR', 'T');

-- CreateEnum
CREATE TYPE "PreviouseYear" AS ENUM ('Current', 'Previous');

-- CreateEnum
CREATE TYPE "ResponsibilityLevel" AS ENUM ('Department', 'Institute');

-- CreateEnum
CREATE TYPE "ExaminationDutyAssignedBy" AS ENUM ('University', 'Institute');

-- CreateEnum
CREATE TYPE "SponsoredResearchStatus" AS ENUM ('Awarded', 'Submitted');

-- CreateEnum
CREATE TYPE "PropertyRightStatus" AS ENUM ('Applied', 'NotApplied');

-- CreateEnum
CREATE TYPE "ActivityTypes" AS ENUM ('ExtraCurricular', 'CoCurricular');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('OutStanding', 'Excellent', 'VeryGood', 'Satisfactory', 'Average');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Teacher', 'Principle', 'HOD');

-- CreateEnum
CREATE TYPE "JournalConferenceLevel" AS ENUM ('Local', 'State', 'International', 'National');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT NOT NULL DEFAULT '/default-user.png',
    "role" "Role" NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "facultyName" TEXT NOT NULL,
    "phdDuringPeriod" TEXT NOT NULL,
    "effectiveCurriculamEfforts" TEXT[],
    "achievements" TEXT[],
    "grade" "Grade",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AverageResult" (
    "id" TEXT NOT NULL,
    "nameOfSubject" TEXT NOT NULL,
    "term" "Term" NOT NULL,
    "level" "Level" NOT NULL,
    "courseHead" "CourseHead" NOT NULL,
    "year" "PreviouseYear" NOT NULL,
    "hoursAlloted" DOUBLE PRECISION NOT NULL,
    "classConducted" DOUBLE PRECISION NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "AverageResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "studentTermIIPreviousYear" INTEGER NOT NULL DEFAULT 0,
    "studentTermICurrentYear" INTEGER NOT NULL DEFAULT 0,
    "peerTermIIPreviousYear" INTEGER NOT NULL DEFAULT 0,
    "peerTermICurrentYear" INTEGER NOT NULL DEFAULT 0,
    "peerAndStudentFeedback" INTEGER NOT NULL DEFAULT 0,
    "performanceId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PublicationAndJournal" (
    "id" TEXT NOT NULL,
    "paperTitle" TEXT NOT NULL,
    "level" "JournalConferenceLevel" NOT NULL,
    "name" TEXT NOT NULL,
    "issnNo" TEXT NOT NULL,
    "isMainAuthor" BOOLEAN NOT NULL,
    "indexedIn" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "PublicationAndJournal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookArticleChapterPublished" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleWithPageNo" TEXT NOT NULL,
    "isbnNo" TEXT NOT NULL,
    "detailOfCoAuthors" TEXT NOT NULL,
    "publishedMonthAndYear" BOOLEAN NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "BookArticleChapterPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramsAttended" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "organizerName" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "ProgramsAttended_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramsOrganized" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "ProgramsOrganized_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsoredResearch" (
    "id" TEXT NOT NULL,
    "scheme" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "status" "SponsoredResearchStatus" NOT NULL,
    "dateOfSubmissionOrAwarded" TIMESTAMP(3) NOT NULL,
    "grantReceived" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "SponsoredResearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultancyService" (
    "id" TEXT NOT NULL,
    "natureOfWork" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "workCommendamentDate" TIMESTAMP(3) NOT NULL,
    "DateOfCompletion" TIMESTAMP(3) NOT NULL,
    "publishingMonthAndYear" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "ConsultancyService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patent" (
    "id" TEXT NOT NULL,
    "status" "PropertyRightStatus" NOT NULL,
    "dateOfAppliedGranted" TIMESTAMP(3) NOT NULL,
    "commercialized" BOOLEAN NOT NULL,
    "intellectualPropertyRightId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CopyRights" (
    "id" TEXT NOT NULL,
    "status" "PropertyRightStatus" NOT NULL,
    "dateOfAppliedGranted" TIMESTAMP(3) NOT NULL,
    "commercialized" BOOLEAN NOT NULL,
    "intellectualPropertyRightId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TradeMarks" (
    "id" TEXT NOT NULL,
    "status" "PropertyRightStatus" NOT NULL,
    "dateOfAppliedGranted" TIMESTAMP(3) NOT NULL,
    "commercialized" BOOLEAN NOT NULL,
    "intellectualPropertyRightId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "IntellectualPropertyRight" (
    "id" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExaminationDuty" (
    "id" TEXT NOT NULL,
    "invigilationFlyingSquadDuty" "ExaminationDutyAssignedBy" NOT NULL,
    "answerEvaluationDuty" "ExaminationDutyAssignedBy" NOT NULL,
    "questionPaperSettingDuty" "ExaminationDutyAssignedBy" NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "ExaminationDuty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "type" "ActivityTypes" NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsibility" (
    "id" TEXT NOT NULL,
    "natureOfWork" TEXT NOT NULL,
    "level" "ResponsibilityLevel" NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "Responsibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "mobile1" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Academics" (
    "id" TEXT NOT NULL,
    "designation" TEXT NOT NULL DEFAULT '',
    "dateOfJoining" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "facultyName" TEXT NOT NULL DEFAULT '',
    "departmentName" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Academics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_performanceId_key" ON "Feedback"("performanceId");

-- CreateIndex
CREATE UNIQUE INDEX "Patent_intellectualPropertyRightId_key" ON "Patent"("intellectualPropertyRightId");

-- CreateIndex
CREATE UNIQUE INDEX "CopyRights_intellectualPropertyRightId_key" ON "CopyRights"("intellectualPropertyRightId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeMarks_intellectualPropertyRightId_key" ON "TradeMarks"("intellectualPropertyRightId");

-- CreateIndex
CREATE UNIQUE INDEX "IntellectualPropertyRight_id_key" ON "IntellectualPropertyRight"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IntellectualPropertyRight_performanceId_key" ON "IntellectualPropertyRight"("performanceId");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationDuty_performanceId_key" ON "ExaminationDuty"("performanceId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_userId_key" ON "PersonalInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Academics_userId_key" ON "Academics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AverageResult" ADD CONSTRAINT "AverageResult_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationAndJournal" ADD CONSTRAINT "PublicationAndJournal_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookArticleChapterPublished" ADD CONSTRAINT "BookArticleChapterPublished_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramsAttended" ADD CONSTRAINT "ProgramsAttended_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramsOrganized" ADD CONSTRAINT "ProgramsOrganized_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsoredResearch" ADD CONSTRAINT "SponsoredResearch_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultancyService" ADD CONSTRAINT "ConsultancyService_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patent" ADD CONSTRAINT "Patent_intellectualPropertyRightId_fkey" FOREIGN KEY ("intellectualPropertyRightId") REFERENCES "IntellectualPropertyRight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CopyRights" ADD CONSTRAINT "CopyRights_intellectualPropertyRightId_fkey" FOREIGN KEY ("intellectualPropertyRightId") REFERENCES "IntellectualPropertyRight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeMarks" ADD CONSTRAINT "TradeMarks_intellectualPropertyRightId_fkey" FOREIGN KEY ("intellectualPropertyRightId") REFERENCES "IntellectualPropertyRight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntellectualPropertyRight" ADD CONSTRAINT "IntellectualPropertyRight_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationDuty" ADD CONSTRAINT "ExaminationDuty_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsibility" ADD CONSTRAINT "Responsibility_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academics" ADD CONSTRAINT "Academics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
