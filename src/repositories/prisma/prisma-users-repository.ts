import { prisma } from '@/lib/prisma'
import type { UserRepository } from '../user-repository'
import type { Prisma, User } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: User) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }

  async save(userId: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })
    return user
  }
}
