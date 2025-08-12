import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { GetAvailableBooksUseCase } from '@/use-case/book/search-ready-book'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function searchByTitle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Instancia o repositório do Prisma
    const prismaBook = new PrismaBookRepository()

    // Instancia o caso de uso
    const searchBook = new GetAvailableBooksUseCase(prismaBook)
    // Executa a busca
    const { book } = await searchBook.execute()

    // Caso não encontre livros com o título informado
    if (!book || book.length === 0) {
      return reply.status(404).send({ message: 'Livro não encontrado' })
    }

    // Retorna o livro encontrado com sucesso
    return reply.status(200).send({ book })
  } catch (error) {
    // Tratamento de erro em caso de falha inesperada
    console.error(error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}
