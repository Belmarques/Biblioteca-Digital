import { prisma } from '@/lib/prisma'
import type { Book, Prisma } from '@prisma/client'
import type { BookRepository } from '../book-repository'

export class PrismaBookRepository implements BookRepository {
  async create(data: Prisma.BookCreateInput) {
    const book = await prisma.book.create({
      data,
    })
    return book
  }

  async findById(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })
    return book
  }

  async searchBookReady(): Promise<Book[]> {
    const readyBook = await prisma.book.findMany({
      where: {
        disponibilidade: 'DISPONIVEL',
      },
    })
    return readyBook
  }

  async delete(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })
    if (!book) {
      throw new Error('Book not found')
    }
    await prisma.book.delete({
      where: {
        id,
      },
    })
  }

  async updateTitle(id: string, titulo: string) {
    const book = await prisma.book.update({
      where: {
        id,
      },
      data: {
        titulo,
      },
    })

    return book
  }

  async findByTitle(query: string) {
    const book = await prisma.book.findMany({
      where: {
        titulo: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        genre: {
          select: {
            name: true,
          },
        },
      },
    })

    return book
  }

  async getAllBooks() {
    const book = await prisma.book.findMany()
    return book
  }

  async getAllAvailableBooks() {
    const book = await prisma.book.findMany({
      where: {
        disponibilidade: 'DISPONIVEL',
      },
    })
    return book
  }

  async updateAvailableBook(id: string, data: Prisma.BookUncheckedUpdateInput) {
    const book = await prisma.book.update({
      where: {
        id,
      },
      data,
    })
    return book
  }
}
