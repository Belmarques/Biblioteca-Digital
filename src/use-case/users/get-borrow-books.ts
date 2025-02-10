import { UserRepository } from '@/repositories/user-repository'
import type {  Loan } from '@prisma/client'
import { NotFound } from '../error/not-found.error'
import type { LoanRepository } from '@/repositories/loan-repository'
interface GetBorrowBookUseCaseRequest {
userId:string
}
interface GetBorrowBookUseCaseResponse {
  loans: Loan[]
}

export class GetBorrowBookUseCase {
  constructor(private userRepository: UserRepository,
    private loanRepository: LoanRepository
  ) {}

  async execute({
userId
  }: GetBorrowBookUseCaseRequest): Promise<GetBorrowBookUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if(!user) {
      throw new NotFound()
    }
    const loans = await this.loanRepository.findMany(user.id)
    return {loans}
  }
}
