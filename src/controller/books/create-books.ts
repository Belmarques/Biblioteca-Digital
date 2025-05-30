import { PrismaAuthorRepository } from '@/repositories/prisma/prisma-author-repository'
import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { PrismaGenreRepository } from '@/repositories/prisma/prisma-genre-repository'
import { CreateBookUseCase } from '@/use-case/book/create-book'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createBookBodySchema = z.object({
      titulo: z.string(),
      authorName: z.string(),
      genreName: z.string(),
    })
    // const id = request.user.sub

    const { authorName, genreName, titulo } = createBookBodySchema.parse(
      request.body,
    )
    console.log(authorName, genreName, titulo, 'body')
    const bookUser = new PrismaBookRepository()
    const authorUser = new PrismaAuthorRepository()
    const genreUse = new PrismaGenreRepository()
    const createBook = new CreateBookUseCase(bookUser, authorUser, genreUse)
    console.log(createBook, 'books')
    const book = await createBook.execute({
      titulo,
      authorName,
      genreName,
    })

    return reply.status(201).send({ book })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error', issues: error.errors })
    }
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
