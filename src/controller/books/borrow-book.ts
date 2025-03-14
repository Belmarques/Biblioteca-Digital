import { PrismaBookRepository } from "@/repositories/prisma/prisma-book-repository";
import { PrismaLoanRepository } from "@/repositories/prisma/prisma-loan-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { BorrowBookUseCase } from "@/use-case/book/borrow-book";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function borrowBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Verifica JWT
    await request.jwtVerify();

    // Validação dos parâmetros e corpo da requisição
    const idSchema = z.object({
      id: z.string().uuid("Invalid book ID format"),
    });

    const borrowBookBodySchema = z.object({
      userId: z.string(),
    });

    const { id:bookId } = idSchema.parse(request.params);
    const { userId } = borrowBookBodySchema.parse(request.body);

    // Instancia os repositórios e caso de uso
    const bookRepository = new PrismaBookRepository();
    const loanRepository = new PrismaLoanRepository();
    const userRepository = new PrismaUserRepository();

    const borrowBookUseCase = new BorrowBookUseCase(bookRepository, loanRepository, userRepository);

    // Executa o caso de uso
    await borrowBookUseCase.execute({
      bookId,
      userId,
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

    if (error.message === "Book not found") {
      return reply.status(404).send({ error: "Book not found" });
    }

    if (error.message === "Livro Indisponível para empréstimo") {
      return reply.status(400).send({ error: "Livro Indisponivel para emprestimo" });
    }

    // Erros genéricos
    console.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}
