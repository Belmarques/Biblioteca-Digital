import { NotFound } from '../error/not-found.error'
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'
interface SearchBookByTitleRequest {
  query: string
}
interface SearchBookByTitleResponse {
  book: Book[]
}

export class SearchBookByTitleUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    query,
  }: SearchBookByTitleRequest): Promise<SearchBookByTitleResponse> {
    const book = await this.bookRepository.findByTitle(query)
    if (!book) {
      throw new NotFound()
    }

    return { book }
  }
}
