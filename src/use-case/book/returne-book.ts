
import type { BookRepository } from '@/repositories/book-repository'
import type { LoanRepository } from '@/repositories/loan-repository'

interface ReturnBookCaseRequest {
loanId:string
}
interface ReturnBookCaseResponse {
  message: string
}

export class ReturnBookUseCase {
  constructor(
   private loanRepository: LoanRepository,
   private bookRepository: BookRepository
  ) { }

  async execute({
loanId
  }: ReturnBookCaseRequest): Promise<ReturnBookCaseResponse> {
    const loan = await this.loanRepository.findLoan(loanId)
    if(!loan) {
      throw new Error('emprestimo nao encontrado')
    }
    if(loan.status !== 'ATIVO') {
      throw new Error('Book already returned')
    }
    await this.loanRepository.save({
      ...loan,
      returned_at: new Date(),
      status: 'FINALIZADO'
    })

    await this.bookRepository.updatedBook(loan.bookId, {
      disponibilidade: 'DISPONIVEL'
    })
   return {message: "Book returned successfully"}
  }
}
