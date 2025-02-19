import type { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/middleware/verifiJWT";
import { getBorrowBooks } from "./get-borrow-books";
import { getLoanBooks } from "./get-loan-books";

export async function userRouter(app:FastifyInstance) {
  app.post('/user', register) // criar usuario
  app.post('/login', authenticate) //Login
  app.get('/me' ,{onRequest:[verifyJWT]},  profile ) // perfil do usuario
  app.get('/users/:id/return', {onRequest:[verifyJWT]}, getBorrowBooks ) // livros que o usuario pegou emprestado
  app.get('/users/:id/loan', {onRequest:[verifyJWT]}, getLoanBooks) // livros que o usuario emprestou
}