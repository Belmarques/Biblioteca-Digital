import { NotFound } from '../error/not-found.error'
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'

interface SearchReadyBookUseCaseRequest {
  title: string
}
interface SearchReadyBookUseCaseResponse {
  book: Book[]
}

export class SearchReadyBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    title,
  }: SearchReadyBookUseCaseRequest): Promise<SearchReadyBookUseCaseResponse> {
    const book = await this.bookRepository.findByTitle(title)
    if (!book) {
      throw new NotFound()
    }

    return { book }
  }
}
