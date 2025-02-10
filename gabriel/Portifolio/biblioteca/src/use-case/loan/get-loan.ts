
import type {  Book, Loan } from '@prisma/client'
import { NotFoundBook } from '../error/not-found-book.error'
import type { LoanRepository } from '@/repositories/loan-repository'
import type { UserRepository } from '@/repositories/user-repository'
import { NotFound } from '../error/not-found.error'


interface GetLoanBookUseCaseRequest {
  id: string
}

interface GetLoanBookUseCaseResponse {
books: Book[]
}

export class GetLoanBookUseCase {
  constructor(private loanRepository: LoanRepository,
    private userRepository: UserRepository
  ) { }

  async execute({
    id
  }: GetLoanBookUseCaseRequest): Promise<GetLoanBookUseCaseResponse> {

    const user = await this.userRepository.findById(id)
    if(!user){
      throw new NotFound()
    }

    const books = await this.loanRepository.getLoan(user.id)
    if (!books) {
      throw new NotFoundBook()
    }
    console.log('books', books);
    
    return { books}
  }
}
