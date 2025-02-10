/*
  Warnings:

  - You are about to drop the column `status` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'ATIVO';
