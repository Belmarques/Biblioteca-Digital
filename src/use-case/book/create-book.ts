import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'
import type { AuthorRepository } from '@/repositories/author-repository'
import type { GenreRepository } from '@/repositories/genre-repository'

interface createBookUseCaseRequest {
  titulo: string
  genreName: string
  authorName: string
  // disponibilidade: string
}
interface createBookUseCaseResponse {
  book: Book
}

export class CreateBookUseCase {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
    private genreRepository: GenreRepository,
  ) {}

  async execute({
    titulo,
    authorName,
    genreName,
  }: createBookUseCaseRequest): Promise<createBookUseCaseResponse> {
    let author = await this.authorRepository.findAuthor(authorName)
    if (!author) {
      author = await this.authorRepository.create({
        name: authorName,
      })
    }

    let genre = await this.genreRepository.findGenre(genreName)
    if (!genre) {
      genre = await this.genreRepository.create({
        name: genreName,
      })
    }
    const bookWithSameTitle = await this.bookRepository.findByTitle(titulo)
    if (bookWithSameTitle.length > 0) {
      throw new Error('Book already exists')
    }
    const book = await this.bookRepository.create({
      titulo,
      author: {
        connectOrCreate: {
          where: {
            id: author.id,
          },
          create: {
            name: author.name,
          },
        },
      },
      genre: {
        connectOrCreate: {
          where: {
            id: genre.id,
          },
          create: {
            name: genre.name,
          },
        },
      },
    })
    return { book }
  }
}
