import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { GetAvailableBooksUseCase } from '@/use-case/book/fetch-available-books'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function GetAvailableBooks(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const bookRepository = new PrismaBookRepository()
    const getBookUseCase = new GetAvailableBooksUseCase(bookRepository)
    const books = await getBookUseCase.execute()

    return reply.status(200).send(books)
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}
