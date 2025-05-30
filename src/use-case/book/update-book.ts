import type { Book } from '@prisma/client'
import type { BookRepository } from '@/repositories/book-repository'

interface UpdateBookUseCaseRequest {
  id: string
  titulo: string
}

interface UpdateBookUseCaseResponse {
  book: Book
}

export class UpdateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    id,
    titulo,
  }: UpdateBookUseCaseRequest): Promise<UpdateBookUseCaseResponse> {
    try {
      // Validação do ID e dados (opcional, dependendo do caso)
      if (!id) {
        throw new Error('O ID do livro é obrigatório.')
      }
      if (!titulo) {
        throw new Error('O título do livro é obrigatório.')
      }
      // Atualizar o livro
      const findId = await this.bookRepository.findById(id)
      if (!findId) {
        throw new Error('Id Invalido')
      }
      console.log(findId, 'ID')
      const book = await this.bookRepository.updateTitle(id, titulo)
      console.log(book, 'Book')
      // Log informativo
      console.log(`Livro atualizado com sucesso: ${book.id}`)

      return { book }
    } catch (error) {
      console.error('Erro ao atualizar o livro:', error)
      throw new Error('Não foi possível atualizar o livro.')
    }
  }
}
