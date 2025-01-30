import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { DeleteBookUseCase } from "@/use-case/book/delete-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function deleteBook(request: FastifyRequest, reply: FastifyReply) {


  const deleteBookSchema = z.object({
    id: z.string()
  })
  const { id } = deleteBookSchema.parse(request.params)
  const prismaBook = new PrismaBookRepository()
  const deleteBook = new DeleteBookUseCase(prismaBook)
  const book = await deleteBook.execute({
    id
  })

  console.log(book)
  return reply.status(200).send({ book })

}