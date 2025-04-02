import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { PrismaLoanRepository } from '@/repositories/prisma/prisma-loan-repository'
import { AutoReturnBookUseCase } from '@/use-case/book/auto-return-books'
import type { FastifyReply, FastifyRequest } from 'fastify'
import cron from 'node-cron'

const bookRepository = new PrismaBookRepository()
const loanRepository = new PrismaLoanRepository()
const autoReturnBooks = new AutoReturnBookUseCase(
  loanRepository,
  bookRepository,
)

// 🕒 Executa automaticamente todos os dias às 00:00
cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Verificando empréstimos vencidos...')
  try {
    await autoReturnBooks.execute()
    console.log('✅ Livros devolvidos automaticamente!')
  } catch (error) {
    console.error('❌ Erro ao devolver livros automaticamente:', error)
  }
})

// Rota manual para testar a funcionalidade de devolução automática
export async function autoReturnBooksRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await autoReturnBooks.execute()
    return reply.status(200).send({
      message: 'Livros devolvidos com sucesso (manual)',
    })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Erro interno do servidor' })
  }
}
