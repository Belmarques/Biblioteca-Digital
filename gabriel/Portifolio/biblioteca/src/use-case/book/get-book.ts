
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'



interface getBookUseCaseResponse {
  book: Book[]
}

export class GetBookUseCase {
  constructor(private bookRepository: BookRepository,
  ) {}

  async execute(): Promise<getBookUseCaseResponse> {


    
    const book = await this.bookRepository.getBook()
    return { book }
  }
}
