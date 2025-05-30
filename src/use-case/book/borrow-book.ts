import type { BookRepository } from '@/repositories/book-repository'
import type { UserRepository } from '@/repositories/user-repository'
import type { LoanRepository } from '@/repositories/loan-repository'

interface BorrowBookUseCaseRequest {
  bookId: string
  userId: string
}
interface BorrowBookUseCaseResponse {
  message: string
}

export class BorrowBookUseCase {
  constructor(
    private bookRepository: BookRepository,
    private loanRepository: LoanRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    bookId,
    userId,
  }: BorrowBookUseCaseRequest): Promise<BorrowBookUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const book = await this.bookRepository.findById(bookId)
    if (!book) {
      throw new Error('Book not found')
    }
    if (book.disponibilidade !== 'DISPONIVEL') {
      throw new Error('Livro Indisponível para empréstimo')
    }
    const returnedDate = new Date()
    returnedDate.setDate(returnedDate.getDate() + 30)
    await this.loanRepository.create({
      bookId,
      userId,
      returned_at: returnedDate,
    })
    await this.bookRepository.updateAvailableBook(bookId, {
      disponibilidade: 'INDISPONIVEL',
    })

    return { message: 'Book borrowed successfully' }
  }
}
