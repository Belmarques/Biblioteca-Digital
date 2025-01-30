import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { SearchReadyBookUseCase } from "@/use-case/book/search-ready-book";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function searchReady(request: FastifyRequest, reply: FastifyReply) {



  const prismaBook = new PrismaBookRepository()
  const searchBook = new SearchReadyBookUseCase(prismaBook)
  const book = await searchBook.execute({

  })

  console.log(book)
  return reply.status(200).send({ book })

}