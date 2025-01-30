import type { UserRepository } from "@/repositories/user-repository"
import type { User } from "@prisma/client"
import { InvalidPassowrdOrEmail } from "../error/InvalidPassowrdOrEmail"
import { compare } from "bcryptjs"

interface authenticateUserCaseRequest {
  email: string
  password: string
}
interface authenticateUserCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
email,
password
  }: authenticateUserCaseRequest): Promise<authenticateUserCaseResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new InvalidPassowrdOrEmail()
    }
    const verifyPassword = await compare(password, user.password_hash)
    if(!verifyPassword) {
      throw new InvalidPassowrdOrEmail()
    }
    return {user}

  }
}
