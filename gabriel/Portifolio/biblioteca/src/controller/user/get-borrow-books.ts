import { PrismaLoanRepository } from "@/repositories/prisma/prisma-loan-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetBorrowBookUseCase } from "@/use-case/users/get-borrow-books";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getBorrowBooks(request:FastifyRequest, reply:FastifyReply) {
 await request.jwtVerify()
 const userIdSchema = z.object({
      id: z.string()
 })
 const userId = userIdSchema.parse(request.params)
    const prismaUser = new PrismaUserRepository()
    const prismaLoan = new PrismaLoanRepository()
    const getBorrowBooks = new GetBorrowBookUseCase(prismaUser, prismaLoan)

    
const user = await getBorrowBooks.execute({
  userId: userId.id
})
  
    return reply.status(200).send({user
    })
  }
