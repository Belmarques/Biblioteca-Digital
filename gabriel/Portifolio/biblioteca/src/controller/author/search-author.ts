import { PrismaAuthorRepository } from "@/repositories/prisma/prisma-author-repository";
import { SearchAuthorUseCase } from "@/use-case/author/searchAuthor";
import type { FastifyReply, FastifyRequest } from "fastify";
import {z} from "zod"

export async function searchAuthor(request:FastifyRequest, reply:FastifyReply) {
  const searchAuthorSchema = z.object({
    query: z.string()
   
  })

  const { query} = searchAuthorSchema.parse(request.query)
  
    const prismaAuthor = new PrismaAuthorRepository()
    const searchAuthor = new SearchAuthorUseCase(prismaAuthor)
const author = await searchAuthor.execute({
  query
})

   console.log(author)
    return reply.status(200).send({author})
 
}