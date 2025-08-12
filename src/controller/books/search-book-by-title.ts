import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { SearchBookByTitleUseCase } from '@/use-case/book/search-book--by-title'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByTitle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validação do título
  const titleBoockSchema = z.object({
    query: z.string().min(1, 'O título não pode estar vazio'), // Adicionando validação mínima
  })
  try {
    const { query } = titleBoockSchema.parse(request.query)
    // Instancia o repositório do Prisma
    console.log(query, 'titulo bu')
    const prismaBook = new PrismaBookRepository()

    // Instancia o caso de uso
    const searchBook = new SearchBookByTitleUseCase(prismaBook)
    console.log(searchBook)
    // Executa a busca
    const { book } = await searchBook.execute({ query })

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
