import { NotFound } from '../error/not-found.error'
import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'
interface SearchBookByTitleRequest {
  title: string
}
interface SearchBookByTitleResponse {
  book: Book[]
}

export class SearchBookByTitleUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    title,
  }: SearchBookByTitleRequest): Promise<SearchBookByTitleResponse> {
    const book = await this.bookRepository.findByTitle(title)
    if (!book) {
      throw new NotFound()
    }

    return { book }
  }
}
