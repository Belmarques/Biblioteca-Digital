// import {  Disponibilidade, type Author, type Book, type Prisma, type User } from "@prisma/client";
// import type { BookRepository } from "../book-repository";
// import { randomUUID } from "crypto";

// export class inMemoryBookRepository implements BookRepository {
//   public items: Book[] = []

//   async create(data: Prisma.BookCreateInput){
//     const book = {
//       id: data.id ?? randomUUID(), // Ou, caso esteja usando Prisma para geração automática de IDs, remova esse campo.
//       titulo: data.titulo,
//       disponibilidade: data.disponibilidade ?? Disponibilidade.DISPONIVEL, // Ajuste para garantir que o valor padrão é definido corretamente.
//       author: data.author,
//       genre: data.genre,
//     };
  
//     this.items.push(book);
  
//     // Retorna o livro após inseri-lo
//     return Promise.resolve(book)
//   }
// async getBook() {
//   return this.items
// }

// async findById(bookId: string) {
//   const book = this.items.find((item) => item.id === bookId)
//   if(!book) {
//     return null
//   }
//   return book
// }

  

// }