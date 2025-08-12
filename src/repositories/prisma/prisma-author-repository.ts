import type { Prisma } from '@prisma/client'
import type { AuthorRepository } from '../author-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAuthorRepository implements AuthorRepository {
  async findAuthor(name: string) {
    const author = await prisma.author.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
      
    })
    if(!author) {
     return null
    }
    return author
  }

  async create(data: Prisma.AuthorUncheckedCreateInput) {
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
            disponibilidade: true,
          },
        },
      },
    })
    return author
  }
}
