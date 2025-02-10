import fastify from 'fastify'
import { userRouter } from './controller/user/router'
import { ZodError } from 'zod'
import fastifyJWT from '@fastify/jwt'
import { env } from './env'
import { bookRouter } from './controller/books/router'
import { authorRouter } from './controller/author/router'
export const app = fastify()
app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn:'10m'
  }
})
app.register(userRouter)
app.register(bookRouter)
app.register(authorRouter)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'validation error',
      issues: error.format(),
    })
  }
  if(env.NODE_ENV === 'production') {
    console.error(error)
  }
  return reply.status(500).send({
    message: 'internal server error'
  })
})