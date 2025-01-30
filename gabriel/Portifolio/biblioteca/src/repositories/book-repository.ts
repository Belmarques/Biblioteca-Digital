import type {   Book,   Prisma } from "@prisma/client";

export interface BookRepository {
  create(data:Prisma.BookCreateInput): Promise<Book>
  findById(id:string): Promise<Book | null>
  getBook(): Promise<Book[]>
  searchBookReady() : Promise<Book[]>
  delete(id:string) : Promise<Book | null>
  updatedBook(id:string, data:Prisma.BookUncheckedUpdateInput) : Promise<Book >
}