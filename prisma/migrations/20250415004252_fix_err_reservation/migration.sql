/*
  Warnings:

  - Added the required column `status` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusReservation" AS ENUM ('PENDENTE', 'FINALIZADO');

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "status" "StatusReservation" NOT NULL,
ALTER COLUMN "reservedAt" SET DEFAULT CURRENT_TIMESTAMP;
