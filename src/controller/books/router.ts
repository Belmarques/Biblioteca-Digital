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
import { verifyUserRole } from "@/middleware/verifyUserRole";

export async function bookRouter(app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/books',{onRequest:[verifyUserRole('ADMIN')]}, createBook) // Criar livro
  app.get('/books', getBook) // listar todos os livros
  app.get('/readybook', searchReady) //Traz Livros Disponivel
  app.get('/books/:id', findBook ) //Trazer um Livro Expecifico
  app.put('/books/:id', {onRequest:[verifyUserRole('ADMIN')]},updatedBook) //Atualizar dados de livro X
  app.delete('/books/:id', {onRequest:[verifyUserRole('ADMIN')]},deleteBook) // deletar livro
  app.post('/books/:id/borrow',borrowBook) // emprestar livro
  app.post('/books/:id/return',returnedBook) // devolver livro
}