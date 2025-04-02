import type { Prisma } from '@prisma/client'
import type { AuthorRepository } from '../author-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAuthorRepository implements AuthorRepository {
  async findAuthor(id: string) {
    return await prisma.author.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.AuthorCreateInput) {
    const author = await prisma.author.create({
      data,
    })
    return author
  }

  async searchMany(query: string) {
    const author = await prisma.author.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        Book: {
          select: {
            titulo: true,
            id: true,
            disponibilidade: true,
          },
        },
      },
    })
    return author
  }
}
