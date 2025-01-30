import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileUseCase } from "@/use-case/users/get-profile";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request:FastifyRequest, reply:FastifyReply) {
 await request.jwtVerify()
    const prismaUser = new PrismaUserRepository()
    const profile = new GetProfileUseCase(prismaUser)

    
    const {user} = await profile.execute({
     userId: request.user.sub
    })
  
    return reply.status(200).send({user
    })
  }
