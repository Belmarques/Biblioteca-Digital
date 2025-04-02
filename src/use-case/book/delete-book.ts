import type { BookRepository } from '@/repositories/book-repository'
import { NotFoundBook } from '../error/not-found-book.error'

interface DeleteBookUseCaseRequest {
  id: string
}

export class DeleteBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({ id }: DeleteBookUseCaseRequest) {
    const book = await this.bookRepository.findById(id)
    if (!book) {
      throw new NotFoundBook()
    }
    await this.bookRepository.delete(id)
  }
}
