import { prisma } from '@/lib/prisma'
import type { Loan, Prisma } from '@prisma/client'
import type { LoanRepository } from '../loan-repository'

export class PrismaLoanRepository implements LoanRepository {
  async create(data: Prisma.LoanUncheckedCreateInput) {
    const loan = await prisma.loan.create({ data })
    return loan
  }

  async findOverdueLoans() {
    const loan = await prisma.loan.findMany({
      where: {
        returned_at: null,
        barrowed_ad: {
          lt: new Date(),
        },
      },
    })
    return loan
  }

  async findMany(id: string) {
    return await prisma.loan.findMany({
      where: {
        userId: id,
      },
      include: {
        book: true,
      },
      orderBy: {
        barrowed_ad: 'desc',
      },
    })
  }

  async save(data: Loan): Promise<Loan> {
    return await prisma.loan.update({
      where: { id: data.id },
      data: {
        status: data.status,
        returned_at: data.returned_at,
      },
    })
  }

  async findLoan(id: string) {
    return await prisma.loan.findUnique({
      where: { id },
    })
  }
}
