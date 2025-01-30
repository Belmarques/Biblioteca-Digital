
import { NotFound } from '../error/not-found.error'
import type {  Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'

interface SearchReadyBookUseCaseRequest {
}
interface SearchReadyBookUseCaseResponse {
  book: Book[]
  }

export class SearchReadyBookUseCase {
  constructor(
    private bookRepository: BookRepository
  ) {}

  async execute({
  }: SearchReadyBookUseCaseRequest): Promise<SearchReadyBookUseCaseResponse> {

    const book = await this.bookRepository.searchBookReady() 
    if(!book) {
      throw new NotFound()
    }
    
    
    return {book}
  }
}
