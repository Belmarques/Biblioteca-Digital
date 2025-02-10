
import type { AuthorRepository } from '@/repositories/author-repository'
import { NotFound } from '../error/not-found.error'
import type { Author } from '@prisma/client'

interface SearchAuthorUseCaseRequest {
query: string
}
interface SearchAuthorUseCaseResponse {
  author: Author[]
  }

export class SearchAuthorUseCase {
  constructor(
    private authorRepository: AuthorRepository
  ) {}

  async execute({
    query
  }: SearchAuthorUseCaseRequest): Promise<SearchAuthorUseCaseResponse> {

    const author = await this.authorRepository.searchMany(query) 
    if(!author) {
      throw new NotFound()
    }
    
    
    return {author}
  }
}
