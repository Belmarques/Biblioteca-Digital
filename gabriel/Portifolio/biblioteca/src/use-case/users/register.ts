import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../error/user-alrealdy-exist'
import type { User } from '@prisma/client'
interface registerUserCaseRequest {
  name: string
  email: string
  password: string
}
interface registerUserCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUserCaseRequest): Promise<registerUserCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWhithSameEmail = await this.userRepository.findByEmail(email)
    if (userWhithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
