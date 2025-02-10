
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'
import { NotFoundBook } from '../error/not-found-book.error'


interface DeleteBookUseCaseRequest {
  id: string
}
interface DeleteBookUseCaseResponse {
  book: Book
}

export class DeleteBookUseCase {
  constructor(private bookRepository: BookRepository,
  ) { }

  async execute({
    id
  }: DeleteBookUseCaseRequest): Promise<DeleteBookUseCaseResponse> {



    const book = await this.bookRepository.delete(id)
    if (!book) {
      throw new NotFoundBook()
    }
    return { book }
  }
}
