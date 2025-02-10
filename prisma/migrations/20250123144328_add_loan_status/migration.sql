/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ATIVO', 'FINALIZADO');

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'ATIVO';

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
