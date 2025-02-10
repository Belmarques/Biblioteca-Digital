import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { UpdateBookUseCase } from "@/use-case/book/update-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatedBook(request: FastifyRequest, reply: FastifyReply) {

  // Definindo o esquema para validar o ID
  const findBookSchema = z.object({
    id: z.string()
  });

  // Definindo o esquema para os dados do livro a serem atualizados
  const bookSchema = z.object({
    titulo: z.string().optional(),
    authorId: z.string().optional(),
    genreId: z.string().optional()
  });

  // Validando os parâmetros da requisição
  const { id } = findBookSchema.parse(request.params);
  const data = bookSchema.parse(request.body);
console.log(data, 'DATA')
console.log(id, 'ID')
  // Instanciando as classes necessárias para executar a atualização
  const prismaBook = new PrismaBookRepository();
  const updateBookUseCase = new UpdateBookUseCase(prismaBook);

  try {
    // Executando a lógica de atualização
    const updatedBook = await updateBookUseCase.execute({
      id,
      data
    });

    // Retornando o livro atualizado com sucesso
    return reply.status(200).send({
      message: "Livro atualizado com sucesso",
      book: updatedBook.book // Retorna o livro atualizado
    });
  } catch (error) {
    // Caso ocorra algum erro
    return reply.status(500).send({
      error: "Erro ao atualizar o livro",
    });
  }
}
