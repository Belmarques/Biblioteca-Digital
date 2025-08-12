import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/middleware/verifiJWT'
import { getBorrowBooks } from './get-borrow-books'

export async function userRouter(app: FastifyInstance) {
  app.post(
    '/user',
    {
      schema: {
        tags: ['User'],
        description: 'Criar usuario',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['name', 'email', 'password'],
        },
      },
    },
    register,
  ) // criar usuario
  app.post(
    '/login',
    {
      schema: {
        tags: ['User'],
        description: 'Login',
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
      },
    },
    authenticate,
  ) // Login
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['User'],
        description: 'Perfil do usuario',
        security: [{ bearerAuth: [] }],
      },
    },
    profile,
  ) // perfil do usuario
  app.get(
    '/users/books',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['User'],
        description: 'Livros que o usuario pegou emprestado',
        security: [{ bearerAuth: [] }],
      },
    },
    getBorrowBooks,
  ) // livros que o usuario pegou emprestado
}
