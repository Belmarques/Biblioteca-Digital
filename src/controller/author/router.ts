import type { FastifyInstance } from 'fastify'

import { searchAuthor } from './search-author'
import { verifyJWT } from '@/middleware/verifiJWT'
export async function authorRouter(app: FastifyInstance) {
  app.get(
    '/author/search',
    {
      schema: {
        tags: ['Author'],
        security: [{ bearerAuth: [] }],
        description: 'Buscar autor por nome',
        query: {
          type: 'object',
          properties: {
            query: { type: 'string' },
          },
        },
      },
      onRequest: [verifyJWT],
    },

    searchAuthor,
  ) // Buscar author
}
