/*
  Warnings:

  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_genreId_fkey";

-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_bookId_fkey";

-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_userId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "authorId",
DROP COLUMN "genreId";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "loans";
