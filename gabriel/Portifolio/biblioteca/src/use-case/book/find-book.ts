
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'
import { NotFoundBook } from '../error/not-found-book.error'


interface FindBookUseCaseRequest {
  id: string
}
interface FindBookUseCaseResponse {
  book: Book
}

export class FindBookUseCase {
  constructor(private bookRepository: BookRepository,
  ) { }

  async execute({
    id
  }: FindBookUseCaseRequest): Promise<FindBookUseCaseResponse> {



    const book = await this.bookRepository.findById(id)
    if (!book) {
      throw new NotFoundBook()
    }
    return { book }
  }
}
