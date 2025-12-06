-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('single', 'inRelationship', 'engaged', 'married', 'complicated', 'loner');

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT,
    "profilePicture" TEXT,
    "gender" "Gender",
    "aboutMe" TEXT,
    "likes" TEXT,
    "dislikes" TEXT,
    "country" TEXT,
    "coverPicture" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
