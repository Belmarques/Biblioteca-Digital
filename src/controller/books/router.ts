import type { FastifyInstance } from 'fastify'
import { createBook } from './create-books'
import { getBook } from './get-books'
import { searchByTitle } from './search-ready-book'
import { findBook } from './find-book'
import { deleteBook } from './delete-book'
import { updateBook } from './updated-book'
import { borrowBook } from './borrow-book'
import { returnedBook } from './returned-book'
import { verifyUserRole } from '@/middleware/verifyUserRole'
import { verifyJWT } from '@/middleware/verifiJWT'
import { GetAvailableBooks } from './fetch-available-books'

export async function bookRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post(
    '/books',
    {
      schema: {
        tags: ['Books'],
        description: 'Criar Livro',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            titulo: { type: 'string' },
            authorName: { type: 'string' },
            genreName: { type: 'string' },
          },
        },
      },
    },
    createBook,
  ) // Criar livro
  app.get(
    '/books',
    {
      schema: {
        tags: ['Books'],
        description: 'Listar livros',
        summary: 'Listar livros',
        security: [{ bearerAuth: [] }],
      },
    },
    getBook,
  ) // listar todos os livros
  app.get(
    '/booksAvailable',
    {
      schema: {
        tags: ['Books'],
        description: 'Listar todos os livros disponivel',
        summary: 'Listar livros disponivel',
        security: [{ bearerAuth: [] }],
      },
    },
    GetAvailableBooks,
  ) // listar todos os livros Disponiveis
  app.get(
    '/books/search',
    {
      schema: {
        tags: ['Books'],
        description: 'Listar livros pelo titulo',
        summary: 'Listar livros pelo titulo',
        security: [{ bearerAuth: [] }],
        query: {
          type: 'object',
          properties: {
            title: { type: 'string' },
          },
        },
      },
    },
    searchByTitle,
  ) // Traz Livros Pelo Titulo
  app.get(
    '/books/:id',
    {
      schema: {
        tags: ['Books'],
        description: 'Listar livro por ID',
        summary: 'Listar livro por ID',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    findBook,
  ) // Trazer um Livro Expecifico
  app.put(
    '/books/:id',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Books'],
        description: 'Atualizar livro',
        summary: 'Atualizar livro',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            titulo: { type: 'string' },
          },
          required: ['titulo'],
        },
      },
    },
    updateBook,
  ) // Atualizar dados de livro X
  app.delete(
    '/books/:id',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Books'],
        description: 'Deletar livro',
        summary: 'Deletar livro',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    deleteBook,
  ) // deletar livro
  app.post(
    '/books/:id/borrow',
    {
      schema: {
        tags: ['Books'],
        description: 'Emprestar livro',
        summary: 'Emprestar livro',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
      },
    },
    borrowBook,
  ) // emprestar livro
  app.post(
    '/books/:id/return',
    {
      schema: {
        tags: ['Books'],
        description: 'Devolver livro',
        summary: 'Devolver livro',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    returnedBook,
  ) // devolver livro
}
