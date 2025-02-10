import { PrismaAuthorRepository } from "@/repositories/prisma/prisma-author-repository";
import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { PrismaGenreRepository } from "@/repositories/prisma/prisma-genre-repository";
import { CreateBookUseCase } from "@/use-case/book/create-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import {z} from "zod"

export async function createBook(request:FastifyRequest, reply:FastifyReply) {
  await request.jwtVerify()
  const createBookBodySchema = z.object({
    titulo: z.string(),
    authorName: z.string(),
    genreName: z.string(),
  })

  const {authorName,genreName,titulo} = createBookBodySchema.parse(request.body)
  
    const bookUser = new PrismaBookRepository()
    const authorUser = new PrismaAuthorRepository()
    const genreUse = new PrismaGenreRepository()
    const createBook = new CreateBookUseCase(bookUser,authorUser,genreUse)
   const book =  await createBook.execute({
authorName,
genreName, 
titulo    
    })
  
  return reply.status(201).send({book})
}