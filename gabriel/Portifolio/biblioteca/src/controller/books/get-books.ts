import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { GetBookUseCase } from "@/use-case/book/get-book";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getBook(request:FastifyRequest, reply:FastifyReply) {
  await request.jwtVerify()


  
    const bookUser = new PrismaBookRepository()
    const  book = new GetBookUseCase(bookUser)
    const getBook = await book.execute()
   console.log(getBook)
  
  return reply.status(200).send(getBook)
}