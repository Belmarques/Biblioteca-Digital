import type { BookRepository } from '@/repositories/book-repository'
import type { AuthorRepository } from '@/repositories/author-repository'
import { NotFound } from '../error/not-found.error'

interface createAuthorUseCaseRequest {
  name: string
}

export class createAuthorUseCase {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
  ) {}

  async execute({ name }: createAuthorUseCaseRequest) {
    const findAuthor = this.authorRepository.findAuthor(name)
    if (!findAuthor) {
      throw new NotFound()
    }

    const createAuthor = this.authorRepository.create({
      name,
    })
    return createAuthor
  }
}
