import type { Book, Prisma } from '@prisma/client'

export interface BookRepository {
  create(data: Prisma.BookCreateInput): Promise<Book>
  findById(id: string): Promise<Book | null>
  getAllBooks(): Promise<Book[]>
  getAllAvailableBooks(): Promise<Book[]>
  findByTitle(title: string): Promise<Book[]>
  delete(id: string): Promise<void>
  updateTitle(id: string, title: string): Promise<Book>
  updateAvailableBook(
    id: string,
    data: Prisma.BookUncheckedUpdateInput,
  ): Promise<Book>
}
