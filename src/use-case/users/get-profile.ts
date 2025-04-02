import { UserRepository } from '@/repositories/user-repository'
import type { User } from '@prisma/client'
import { NotFound } from '../error/not-found.error'
interface getProfileUseCaseRequest {
  userId: string
}
interface getProfileUseCaseResponse {
  user: User
}

export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: getProfileUseCaseRequest): Promise<getProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new NotFound()
    }
    return { user }
  }
}
