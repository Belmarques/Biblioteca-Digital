import fastify from 'fastify'
import { userRouter } from './controller/user/router'
import { ZodError } from 'zod'
import fastifyJWT from '@fastify/jwt'
import { env } from './env'
import { bookRouter } from './controller/books/router'
import { authorRouter } from './controller/author/router'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifySwagger from '@fastify/swagger'
export const app = fastify()

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Biblioteca API',
      description: 'API para gerenciamento de biblioteca.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(bookRouter)
app.register(userRouter)
app.register(authorRouter)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'validation error',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV === 'production') {
    console.error(error)
  }
  return reply.status(500).send({
    message: 'internal server error',
  })
})
