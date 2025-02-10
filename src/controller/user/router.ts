import type { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/middleware/verifiJWT";
import { getBorrowBooks } from "./get-borrow-books";
import { getLoanBooks } from "./get-loan-books";

export async function userRouter(app:FastifyInstance) {
  app.post('/users', register)
  app.post('/login', authenticate)
  app.get('/me' ,{onRequest:[verifyJWT]},  profile )
  app.get('/users/:id/return', {onRequest:[verifyJWT]}, getBorrowBooks )
  app.get('/users/:id/loan', {onRequest:[verifyJWT]}, getLoanBooks)
}