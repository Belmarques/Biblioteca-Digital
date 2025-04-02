import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { UpdateBookUseCase } from '@/use-case/book/update-book'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateBook(request: FastifyRequest, reply: FastifyReply) {
  // Definindo o esquema para validar o ID
  const findBookSchema = z.object({
    id: z.string(),
  })

  // Definindo o esquema para os dados do livro a serem atualizados
  const bookSchema = z.object({
    titulo: z.string().min(1, 'O título não pode estar vazio'),
  })

  // Validando os parâmetros da requisição
  const { id } = findBookSchema.parse(request.params)
  const { titulo } = bookSchema.parse(request.body)
  console.log(id, 'ID')
  // Instanciando as classes necessárias para executar a atualização
  const prismaBook = new PrismaBookRepository()
  const updateBookUseCase = new UpdateBookUseCase(prismaBook)

  try {
    // Executando a lógica de atualização
    const updateBook = await updateBookUseCase.execute({
      id,
      titulo,
    })

    // Retornando o livro atualizado com sucesso
    return reply.status(200).send({
      message: 'Livro atualizado com sucesso',
      book: updateBook.book, // Retorna o livro atualizado
    })
  } catch (error) {
    // Caso ocorra algum erro
    return reply.status(500).send({
      error: 'Erro ao atualizar o livro',
    })
  }
}
