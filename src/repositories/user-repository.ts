import type { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  // save(data: User): Promise<User>
  // findBook(id:string): Promise<Loan | null>
}
