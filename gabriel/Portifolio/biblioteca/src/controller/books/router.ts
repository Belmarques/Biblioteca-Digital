import type { FastifyInstance } from "fastify";

import { verifyJWT } from "@/middleware/verifiJWT";
import { createBook } from "./create-books";
import { getBook } from "./get-books";
import { searchReady } from "./search-ready-book";
import { findBook } from "./find-book";
import { deleteBook } from "./delete-book";
import { updatedBook } from "./updated-book";
import { borrowBook } from "./borrow-book";
import { returnedBook } from "./returned-book";

export async function bookRouter(app:FastifyInstance) {
  app.post('/books',{onRequest:[verifyJWT]}, createBook) // Criar livro
  app.get('/books', {onRequest:[verifyJWT]}, getBook) // listar todos os livros
  app.get('/readybook', searchReady) //Traz Livros Disponivel
  app.get('/books/:id',findBook ) //Trazer um Livro Expecifico
  app.put('/books/:id', {onRequest:[verifyJWT]},updatedBook) //Atualizar dados de livro X
  app.delete('/books/:id', {onRequest:[verifyJWT]},deleteBook) // deletar livro
  app.post('/books/:id/borrow', {onRequest:[verifyJWT]},borrowBook) // emprestar livro
  app.post('/books/:id/return', {onRequest:[verifyJWT]},returnedBook) // devolver livro
}