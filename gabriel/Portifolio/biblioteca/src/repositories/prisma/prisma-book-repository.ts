import { prisma } from "@/lib/prisma";
import type {   Book,  Prisma  } from "@prisma/client";
import type { BookRepository } from "../book-repository";

export class PrismaBookRepository implements BookRepository {

   async create(data:Prisma.BookCreateInput){
    const book = await prisma.book.create({
      data
    })
    return book
     
   }
   async findById(id:string) {
    const book = await prisma.book.findUnique({
      where:{
        id,
      }
    })
    return book
     
   }
   async getBook() {
     const book = await prisma.book.findMany()
     return book
   }
   async searchBookReady(): Promise<Book[]> {
     const readyBook = await prisma.book.findMany({
      where: {
         disponibilidade: "DISPONIVEL"
      }
     })
     return readyBook
   }
 async delete(id: string) {
   const book = await prisma.book.delete({
    where: {
      id
    }
   })
   if(!book) {
    return null
   }
   return book
 }
 async updatedBook(id: string, data: Prisma.BookUncheckedUpdateInput) {
   const book = await prisma.book.update({
    where:{
      id
    },
    data,
   })
 
   return book
 }
}