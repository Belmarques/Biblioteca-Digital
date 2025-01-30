import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-case/error/user-alrealdy-exist";
import { RegisterUseCase } from "@/use-case/users/register";
import type { FastifyReply, FastifyRequest } from "fastify";
import {z} from "zod"

export async function register(request:FastifyRequest, reply:FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const {name, email, password} = registerBodySchema.parse(request.body)
  try {
    const prismaUser = new PrismaUserRepository
    const userRegister = new RegisterUseCase(prismaUser)
    userRegister.execute({
      email,
      name,
      password
    })
  } catch(err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message:err.message})
    }
  }
  return reply.status(201).send()
}