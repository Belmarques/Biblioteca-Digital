import type { BookRepository } from '@/repositories/book-repository'
import type { LoanRepository } from '@/repositories/loan-repository'

export class AutoReturnBookUseCase {
  constructor(
    private loanRepository: LoanRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute() {
    const overDueloan = await this.loanRepository.findOverdueLoans()

    for (const loan of overDueloan) {
      console.log(`Devolvendo livro com ID: ${loan.bookId}`)

      await this.loanRepository.save({
        ...loan,
        returned_at: new Date(),
        status: 'FINALIZADO',
      })

      await this.bookRepository.updateBook(loan.bookId, {
        disponibilidade: 'DISPONIVEL',
      })
    }
  }
}
