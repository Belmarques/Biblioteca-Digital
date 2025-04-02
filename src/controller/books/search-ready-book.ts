import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { SearchReadyBookUseCase } from '@/use-case/book/search-book--by-title'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchReady(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validação do título
  const findBookSchema = z.object({
    title: z.string().min(1, 'O título não pode estar vazio'), // Adicionando validação mínima
  })

  // Validar o corpo da requisição
  const { title } = findBookSchema.parse(request.body)

  try {
    // Instancia o repositório do Prisma
    const prismaBook = new PrismaBookRepository()

    // Instancia o caso de uso
    const searchBook = new SearchReadyBookUseCase(prismaBook)

    // Executa a busca
    const { book } = await searchBook.execute({ title })

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
