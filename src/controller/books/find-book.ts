import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { FindBookUseCase } from "@/use-case/book/find-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function findBook(request: FastifyRequest, reply: FastifyReply) {


  const findBookSchema = z.object({
    id: z.string()
  })
  const { id } = findBookSchema.parse(request.params)
  const prismaBook = new PrismaBookRepository()
  const searchBook = new FindBookUseCase(prismaBook)
  const book = await searchBook.execute({
    id
  })

  console.log(book)
  return reply.status(200).send({ book })

}