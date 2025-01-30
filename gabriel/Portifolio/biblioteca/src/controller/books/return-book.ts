import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { PrismaLoanRepository } from "@/repositories/prisma/prisma-loan-repository";
import { ReturnBookUseCase } from "@/use-case/book/returne-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function returnBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Verifica JWT
    await request.jwtVerify();

    const idSchema = z.object({
      id: z.string()
    });



    const { id } = idSchema.parse(request.params);

    // Instancia os repositórios e caso de uso
    const loanRepository = new PrismaLoanRepository();
    const bookRepository = new PrismaBookRepository();
    const returnBookUseCase = new ReturnBookUseCase(loanRepository, bookRepository);

    // Executa o caso de uso
    await returnBookUseCase.execute({
      loanId: id
    });

    // Retorna sucesso
    return reply.status(200).send({ message: "Book borrowed successfully" });

  } catch (error: any) {
    // Tratamento de erros específicos
    if (error.name === "ZodError") {
      return reply.status(400).send({
        error: "Validation error",
        details: error.errors,
      });
    }

    if (error.message === "emprestimo nao encontrado") {
      return reply.status(404).send({ error: "emprestimo nao encontrado" });
    }



    // Erros genéricos
    console.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}
