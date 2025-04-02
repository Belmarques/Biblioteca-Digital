import type { User } from '@prisma/client'
import type { UserRepository } from '../user-repository'

export class inMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: User) {
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      role: data.role,
      created_at: data.created_at,
    }
    this.items.push(user)
    return user
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)
    if (!user) {
      return null
    }
    return user
  }
}
