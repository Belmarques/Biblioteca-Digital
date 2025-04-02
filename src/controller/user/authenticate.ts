import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidPassowrdOrEmail } from '@/use-case/error/InvalidPassowrdOrEmail'
import { AuthenticateUseCase } from '@/use-case/users/authenticate'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const AuthenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = AuthenticateSchema.parse(request.body)
  try {
    const prismaUser = new PrismaUserRepository()
    const login = new AuthenticateUseCase(prismaUser)
    const { user } = await login.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidPassowrdOrEmail) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
