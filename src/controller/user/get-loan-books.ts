import { PrismaLoanRepository } from "@/repositories/prisma/prisma-loan-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetLoanBookUseCase } from "@/use-case/loan/get-loan";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getLoanBooks(request:FastifyRequest, reply:FastifyReply) {
  await request.jwtVerify()


    const getLoanBookSchema = z.object({
      id: z.string()
    })
    const { id } = getLoanBookSchema.parse(request.params)
    const loanUser = new PrismaLoanRepository()
    const user = new PrismaUserRepository()
    const  getLoan = new GetLoanBookUseCase(loanUser,user)
    const book = await getLoan.execute({
      id
    })
    console.log(book);
    
    return reply.status(200).send(book)
  }
    
