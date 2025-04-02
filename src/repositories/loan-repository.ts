import type { Loan, Prisma } from '@prisma/client'

export interface LoanRepository {
  create(data: Prisma.LoanUncheckedCreateInput): Promise<Loan>
  findOverdueLoans(): Promise<Loan[]>
  findMany(id: string): Promise<Loan[]>
  save(data: Loan): Promise<Loan>
  findLoan(id: string): Promise<Loan | null>
  // getLoan(id:string): Promise<Book[]>;
}
